import ast
import click

import pandas as pd
import numpy as np

from sklearn.preprocessing import OneHotEncoder


def merge_id_into_df(df, id_df):
    """
    Merge two DataFrames by 'track_id' and 'song_id'
    
    :param df: DataFrame with data
    :param id_df: DataFrame with track_id and song_id to id

    :return: merge DataFrame
    """
    df = pd.merge(df, id_df, on=['track_id', 'song_id'])
    return df


def fetch_tracks_info_df(df):
    """
    Fetching colums with data for DataFrame with track's information
    
    :param df: DataFrame with data
    :return: DataFrame with track's information
    """

    gen_df = df.copy()
    gen_df = gen_df[['artist_name', 'title', 'release', 'track_id', 'song_id']]

    for column_name in gen_df.columns:
        gen_df[column_name] = gen_df[column_name].map(lambda x: ast.literal_eval(x).decode('utf-8'))

    gen_df.rename(columns={'release': 'album_name'}, inplace=True)
    gen_df['year'] = df['year']

    return gen_df


def fetch_training_df(df):
    """
    Fetching colums with data for DataFrame with training data
    
    :param df: DataFrame with data
    :return: DataFrame with training data
    """

    gen_df = df.copy()
    gen_df.drop(['artist_name', 'title', 'release'], axis=1, inplace=True)
    return gen_df


def generate_info_df(df, id_csv):
    """
    Generate DataFrame with track's information
    
    :param df: DataFrame with data
    :param id_csv: DataFrame with track_id and song_id to id
    :return: DataFrame with track's information
    """

    info_df = fetch_tracks_info_df(df)
    info_df = merge_id_into_df(info_df, id_csv)

    return info_df


def generate_training_df(df, id_csv):
    """
    Generate DataFrame with training information
    
    :param df: DataFrame with data
    :param id_csv: DataFrame with track_id and song_id to id
    :return: DataFrame with training information
    """

    train_df = fetch_training_df(df)
    
    for column_name in ['song_id', 'track_id']:
        train_df[column_name] = train_df[column_name].map(lambda x: ast.literal_eval(x).decode('utf-8'))
        
    train_df.drop(['year'], axis=1, inplace=True)
    train_df = merge_id_into_df(train_df, id_csv)
    train_df.drop(['song_id', 'track_id'], axis=1, inplace=True)

    return train_df


@click.command()
@click.option('--id_csv_path', '-i',
              default='../data/song_track_to_id.csv',
              help='Path to csv with id to song_id/track_id')
@click.option('--summary_csv_path', '-s',
              default='../data/msd_summary_file.csv',
              help='Path to summary csv')
@click.option('--training_csv_path', '-t',
              default='../data/training.csv',
              help='Path where store trainin csv')
@click.option('--info_csv_path', '-s',
              default='../data/info.csv',
              help='Path where store info csv')
def main(id_csv_path, summary_csv_path, training_csv_path, info_csv_path):
    df = pd.read_csv(summary_csv_path)
    df = df.fillna(0)

    df['end_of_fade_in_relative'] = df['end_of_fade_in'].values / df['duration']
    df['start_of_fade_out_relative'] = df['start_of_fade_out'].values / df['duration']
    df.drop(['end_of_fade_in', 'start_of_fade_out'], axis=1, inplace=True)

    id_df = pd.read_csv(id_csv_path)

    training_df = generate_training_df(df, id_df)
    info_df = generate_info_df(df, id_df)

    training_df.to_csv(training_csv_path, index=False)
    info_df.to_csv(info_csv_path, index=False)


if __name__ == '__main__':
    main()
