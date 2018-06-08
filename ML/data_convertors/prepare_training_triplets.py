import click
import pandas as pd
import numpy as np

from tqdm import tqdm


@click.command()
@click.option('--id_csv_path', '-i',
              default='../data/song_track_to_id.csv',
              help='Path to csv with id to song_id/track_id')
@click.option('--triplet_txt_path', '-t',
              default='../data/kaggle_visible_evaluation_triplets.txt',
              help='Path to txt with training triplets')
@click.option('--result_triplet_csv_path', '-r',
              default='../data/training_triplets.csv',
              help='Path where to store result csv')
def main(id_csv_path, triplet_txt_path, result_triplet_csv_path):
    triplet_df = pd.read_csv(triplet_txt_path, sep='\t', header=None)
    id_df = pd.read_csv(id_csv_path)

    unique_users = np.unique(triplet_df[0].values)
    users_to_id = {user_hash: idx for idx, user_hash in enumerate(unique_users)}

    triplet_df['user_id'] = triplet_df[0].map(lambda x: users_to_id[x])

    triplet_df = pd.merge(triplet_df, id_df, left_on=1, right_on='song_id')
    triplet_df.drop([0, 1, 'song_id', 'track_id'], axis=1, inplace=True)
    triplet_df.rename(columns={'id': 'track_id', 2: 'track_listen_count'}, inplace=True)
    triplet_df.to_csv(result_triplet_csv_path, index=False)

if __name__ == '__main__':
    main()
