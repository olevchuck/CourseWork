import os

import click
import pandas as pd
import numpy as np



@click.command()
@click.option('--unique_tracks_csv_path', '-u',
              default='../data/unique_tracks.txt',
              help='Path to csv with unique track/songs (see README.md)')
@click.option('--result_csv_path', '-r',
              default='../data/song_track_to_id.csv',
              help='Path where to store result csv file')
def main(unique_tracks_csv_path, result_csv_path):
    input_csv = pd.read_csv(unique_tracks_csv_path,
                            header=None,
                            sep='<SEP>')

    unique_tracks = input_csv[0].values
    tracks_to_id_map = {name: idx for idx, name in enumerate(unique_tracks)}
    input_csv['id'] = input_csv[0].map(lambda x: tracks_to_id_map[x])

    data = {
        'track_id': input_csv[0].values, 
        'song_id': input_csv[1].values,
        'id': input_csv['id'].values,
    }

    result_df = pd.DataFrame(data=data)

    result_df.to_csv(result_csv_path, index=False)


if __name__ == '__main__':
    main()
