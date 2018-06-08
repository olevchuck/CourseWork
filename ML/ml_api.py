import json
import pickle as pkl

from collections import OrderedDict

import pandas as pd
import numpy as np

import mysql.connector
import click


MIN_LISTED_TRACKS_TRESHOLD = 500


def df_crossjoin(df1, df2, **kwargs):
    """
    Make a cross join (cartesian product) between two dataframes by using a constant temporary key.
    Also sets a MultiIndex which is the cartesian product of the indices of the input dataframes.
    See: https://github.com/pydata/pandas/issues/5401
    :param df1 dataframe 1
    :param df1 dataframe 2
    :param kwargs keyword arguments that will be passed to pd.merge()
    :returns: cross join of df1 and df2
    """

    df1['_tmpkey'] = 1
    df2['_tmpkey'] = 1

    res = pd.merge(df1, df2, on='_tmpkey', **kwargs).drop('_tmpkey', axis=1)
    res.index = pd.MultiIndex.from_product((df1.index, df2.index))

    df1.drop('_tmpkey', axis=1, inplace=True)
    df2.drop('_tmpkey', axis=1, inplace=True)

    return res


def is_enough_data_for_model_prediction(user_track_ids):
    """
    Is enough data for prediction by model
    :param user_track_ids: list of tracks ids that listed by user
    :return: True if enough data, False - otherwise
    """
    return len(user_track_ids) > MIN_LISTED_TRACKS_TRESHOLD


def transform_temporal_fields(df):
    """
    Transfrom temporal data in pandas dataframe
    :param df: dataframe with columns 'tempo' and 'duration'
    :returns: transformed dataframe
    """
    df = df.assign(tempo=df['tempo'].map(lambda x: np.log(x + 1)))
    df = df.assign(duration=df['duration'].map(lambda x: np.log(x)))
    return df


def print_predicted_tracks_ids(predicted_tracks_ids):
    """
    Prints predicted tacks ids
    :param predicted_tracks_ids: list of tracks ids
    """
    print(','.join((str(track_id) for track_id in predicted_tracks_ids)))


def get_not_heard_most_popular_tracks(user_track_ids, all_traks_info):
    """
    Select tracks info for most popular tracks that user did not hear
    :param user_track_ids: list of tracks heard by user
    :param all_traks_info: ml data for all tracks
    :return: selected tracks info
    """

    not_heard_tracks_info = [track_info for track_info in all_traks_info
                             if track_info['id'] not in frozenset(user_track_ids)]

    not_heard_tracks_info.sort(key=lambda x: x['heard_by_unique_users_counter'])

    return not_heard_tracks_info


def prepare_not_heard_tracks_data(user_track_ids, all_traks_info):
    """
    Prepare data for not heard tracks
    :param user_track_ids: list of tracks heard by user
    :param all_traks_info: ml data for all tracks
    :return: tracks ids and their info
    """
    not_heard_tracks_info = get_not_heard_most_popular_tracks(user_track_ids,
                                                              all_traks_info)
    not_heard_tracks_df = pd.DataFrame.from_dict(not_heard_tracks_info)
    not_heard_ids = not_heard_tracks_df['id']

    ml_data = not_heard_tracks_df.drop(['id', 'heard_by_unique_users_counter'], axis=1)
    ml_data = transform_temporal_fields(ml_data)

    return not_heard_ids, ml_data


def get_heard_tracks_info(user_track_ids, all_traks_info):
    """
    Select tracks info for all tracks head by user
    :param user_track_ids: list of tracks heard by user
    :param all_traks_info: ml data for all tracks
    :return: tracks info
    """

    heard_tracks_info = [track_info for track_info in all_traks_info
                         if track_info['id'] in frozenset(user_track_ids)]

    return heard_tracks_info


def get_user_description(user_track_ids, all_traks_info):
    """
    Get vector that describe user
    :param user_track_ids: list of tracks heard by user
    :param all_traks_info: ml data for all tracks
    :return: user description dataframe
    """

    heard_tracks_info = get_heard_tracks_info(user_track_ids, all_traks_info)
    heard_tracks_df = pd.DataFrame.from_dict(heard_tracks_info)
    heard_tracks_df.drop(['id', 'heard_by_unique_users_counter'],
                         axis=1, inplace=True)
    heard_tracks_df = transform_temporal_fields(heard_tracks_df)

    user_description = heard_tracks_df.median(axis=0)
    user_description = pd.DataFrame(data=[user_description.values],
                                    columns=user_description.index)
    return user_description


def prepare_data_for_model_inference(user_track_ids, all_traks_info):
    """
    Prepare data for model inference
    :param user_track_ids: list of tracks heard by user
    :param all_traks_info: ml data for all tracks
    :return: track ids and prepared dataframe
    """

    user_description = get_user_description(user_track_ids, all_traks_info)
    not_heard_ids, not_heard_data = prepare_not_heard_tracks_data(user_track_ids, all_traks_info)
    data_for_inference = df_crossjoin(not_heard_data, user_description)
    return not_heard_ids, data_for_inference


def predict_most_popular_tracks_ids(user_track_ids,
                                    num_of_tracks_to_predict,
                                    all_traks_info):
    """
    Predict most popular tracks ids that user did not hear
    :param user_track_ids: list of tracks heard by user
    :param num_of_tracks_to_predict: number of tracks to predict
    :param all_traks_info: tracks info (see get_info_for_all_tracks)
    :return: predicted tracks ids
    """

    not_heard_tracks_info = get_not_heard_most_popular_tracks(user_track_ids,
                                                              all_traks_info)

    trancated_not_heard_tracks_info = not_heard_tracks_info[:num_of_tracks_to_predict]
    predicted_tracks_ids = [track_info['id'] for track_info in trancated_not_heard_tracks_info]

    return predicted_tracks_ids



def predict_tracks_ids_by_model(user_track_ids,
                                num_of_tracks_to_predict,
                                all_traks_info,
                                model_path):
    """
    Predict most popular tracks ids that user did not hear and verifie them
    by predictor model

    :param user_track_ids: list of tracks heard by user
    :param num_of_tracks_to_predict: number of tracks to predict
    :param all_traks_info: tracks info (see get_info_for_all_tracks)
    :param model_path: path to serialized model
    :return: predicted tracks ids
    """

    tracks_ids, data_for_inference = prepare_data_for_model_inference(user_track_ids, all_traks_info)

    with open(model_path, 'rb') as file:
        model = pkl.load(file)

    tracks_predictions = model.predict(data_for_inference).astype(np.bool)

    predicted_tracks_ids = [track_id for track_id, is_good_for_user in zip(tracks_ids, tracks_predictions)
                            if is_good_for_user]
    trancated_predicted_ids = predicted_tracks_ids[:num_of_tracks_to_predict]

    return trancated_predicted_ids


def get_listed_tracks_by_user_id(db_connection, user_id):
    """
    Get all listed tracks id for user_id
    :param db_connection: connection to DB
    :param user_id: user id
    :return: ids for all listed tracks id for given user_id
    """

    SQL_QUERY = """
    SELECT SongID
    FROM UserListens
    WHERE UserID = {}
    """.format(user_id)

    cursor = db_connection.cursor()
    cursor.execute(SQL_QUERY)
    listen_tracks_ids = [row[0] for row in cursor]
    cursor.close()

    return listen_tracks_ids


def get_info_for_all_tracks(db_connection):
    """

    :param db_connection: connection to DB
    :return: ML data, track id, number of users that
             like this track for all tracks
    """

    SQL_QUERY = """
    SELECT U.SongID AS 'id',
        count(U.UserID) AS 'heard_by_unique_users_counter',
        S.song_artist_familiarity AS 'artist_familiarity',
        S.song_artist_hotttnesss AS 'artist_hotttnesss',
        S.song_duration AS 'duration',
        S.song_key AS 'key',
        S.song_key_confidence AS 'key_confidence',
        S.song_loudness AS 'loudness', 
        S.song_hotttnesss AS 'song_hotttnesss',
        S.song_tempo AS 'tempo',
        S.song_end_of_fade_in_relative AS 'end_of_fade_in_relative', 
        S.song_start_of_fade_out_relative AS 'start_of_fade_out_relative',
        S.song_loudness AS 'loudness'
     FROM UserListens AS U
     INNER JOIN SongNeuralNetworkData AS S
                ON S.ID = U.SongID
     WHERE U.ListenCount > 1
     GROUP BY SongID
    """

    cursor = db_connection.cursor()
    cursor.execute(SQL_QUERY)
    columns_names = tuple([column[0] for column in cursor.description])

    tracks_info = [OrderedDict(zip(columns_names, row)) for row in cursor]
    cursor.close()

    return tracks_info


def get_credential(credential_json_path):
    """
    Loads credintial from json file
    :param credential_file_path: path to json with credential
    :return: dict with DB credential
    """

    with open(credential_json_path) as file:
        credentail = json.load(file)

    return credentail


@click.command()
@click.option('--user_id',
              help='User id')
@click.option('--num_of_tracks_to_predict', '-n',
              default=50,
              help='Maximal number of tracks to predict')
@click.option('--credential_json_path', '-c',
              default='../NodeServer/credential.json',
              help='Path to DB credential file')
@click.option('--model_path', '-m',
              default='./data/model.pkl',
              help='Path to serialized model')
def predict_tracks_by_user_id(user_id,
                              num_of_tracks_to_predict,
                              credential_json_path,
                              model_path):

    num_of_tracks_to_predict = int(num_of_tracks_to_predict)
    credential = get_credential(credential_json_path)

    db_connection = mysql.connector.connect(**credential)
    try:
        all_tracks_info = get_info_for_all_tracks(db_connection)
        user_track_ids = get_listed_tracks_by_user_id(db_connection, user_id)
    finally:
        db_connection.close()

    if is_enough_data_for_model_prediction(user_track_ids):
        predicted_tracks_ids = predict_tracks_ids_by_model(user_track_ids,
                                                           num_of_tracks_to_predict,
                                                           all_tracks_info,
                                                           model_path)
    else:
        predicted_tracks_ids = predict_most_popular_tracks_ids(user_track_ids,
                                                               num_of_tracks_to_predict,
                                                               all_tracks_info)

    print_predicted_tracks_ids(predicted_tracks_ids)


if __name__ == '__main__':
    predict_tracks_by_user_id()

