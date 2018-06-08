import pickle
import click

import pandas as pd
import numpy as np
import xgboost as xgb

from sklearn.metrics import accuracy_score


ATTRIBUTES = ['artist_familiarity', 'artist_hotttnesss', 'duration',
                  'key', 'key_confidence', 'loudness', 'song_hotttnesss',
                  'tempo', 'end_of_fade_in_relative', 'start_of_fade_out_relative',
                  'loudness']

VALIDATION_SIZE = 0.1
RANDOM_SEED = 0xCAFFE


@click.command()
@click.option('--training_csv_path',
              default='./data/training.csv',
              help='Path to csv with training data (songs properties)')
@click.option('--training_triplets',
              default='./data/training_triplets.csv',
              help='Path to csv with training triplets')
@click.option('--save_model_path',
              default='./data/model.pkl',
              help='Path where store trained model')
def main(training_csv_path, training_triplets, save_model_path):
    training_df = pd.read_csv(training_csv_path)
    training_triplets_df = pd.read_csv(training_triplets)

    merged_df = pd.merge(training_triplets_df, training_df,
                         left_on='track_id', right_on='id')
    merged_df.drop(['danceability', 'energy', 'mode', 'mode_confidence',
                    'time_signature', 'time_signature_confidence',
                    'id'], axis=1, inplace=True)

    merged_df['tempo'] = merged_df['tempo'].map(lambda x: np.log(x + 1))
    merged_df['duration'] = merged_df['duration'].map(lambda x: np.log(x))

    for attr in ATTRIBUTES:
        mean = merged_df[attr].mean()
        std = merged_df[attr].std()
        merged_df[attr] = merged_df[attr].apply(lambda x: (x - mean) / std)

    # users description
    only_liked_tracks = (merged_df['track_listen_count'] > 1)
    users_merged_df_median = merged_df[only_liked_tracks].groupby(by='user_id').median()
    users_merged_df_median.drop(['track_listen_count', 'track_id'], axis=1, inplace=True)

    # shuffle and add label
    np.random.seed(RANDOM_SEED)
    merged_df = merged_df.reindex(np.random.permutation(merged_df.shape[0]))
    merged_df['label'] = merged_df['track_listen_count'].map(lambda x: 1 if x > 1 else 0)
    merged_df.drop('track_listen_count', axis=1, inplace=True)

    # merge user info and tracks metadata
    users_and_tracks_data_df = pd.merge(merged_df, users_merged_df_median,
                               left_on='user_id', right_index=True)
    users_and_tracks_data_df.drop(['user_id', 'track_id'], axis=1, inplace=True)

    val_size = int(merged_df.shape[0] * VALIDATION_SIZE)
    train, val = users_and_tracks_data_df.iloc[:-val_size],  users_and_tracks_data_df.iloc[-val_size:]

    train_x, train_y = train.drop('label', axis=1), train['label']
    val_x, val_y = val.drop('label', axis=1), val['label']

    # create and traine model
    gbm = xgb.XGBClassifier(n_estimators=30, learning_rate=0.3, max_depth=14,
                            subsample=0.8, colsample_bytree=0.9, reg_lambda=0.00005)
    gbm.fit(train_x, train_y)

    # predict on train and val
    y_pred_val = gbm.predict(val_x)
    y_pred_train = gbm.predict(train_x)

    train_acc = accuracy_score(train_y, y_pred_train, normalize=True)
    val_acc = accuracy_score(val_y, y_pred_val, normalize=True)

    print("Train accuracy: %.5f" % train_acc)
    print("Validation accuracy: %.5f" % val_acc)

    with open(save_model_path, 'wb') as file:
        pickle.dump(gbm, file)


if __name__ == '__main__':
    main()
