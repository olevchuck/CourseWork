import os
import subprocess
import click

import pandas as pd
import numpy as np
from tqdm import tqdm

from tracks_downloader import get_track_url


RANDOM_SEED = 0xCAFFE


@click.command()
@click.option('--tracks_df_path', '-t',
              help='Path to csv with tracks info')
@click.option('--save_dir', '-s',
              default='./downloaded_tracks',
              help='Path to folder where store downloaded tracks')
def main(tracks_df_path, save_dir):
    df = pd.read_csv(tracks_df_path)

    if not os.path.exists(save_dir):
        os.makedirs(save_dir)

    skipped_songs_count = 0

    np.random.seed(RANDOM_SEED)
    df = df.reindex(np.random.permutation(df.shape[0]))

    for _, row in tqdm(df.iterrows(), desc='Tracks downloading progress'):
        artist = str(row.artist_name)
        title = str(row.title)

        track_name = artist + ' - ' + title

        try:
            url = get_track_url(track_name, limit_num_of_res_urls=1)[0]
        except KeyboardInterrupt:
            raise
        except:
            skipped_songs_count += 1
            continue

        artist = artist.lower().replace(' ', '_').replace('(', '').replace(')', '')
        title = title.lower().replace(' ', '_').replace('(', '').replace(')', '')

        try:
            track_save_dir = os.path.join(save_dir, artist)
        except UnicodeDecodeError:
            skipped_songs_count += 1
            continue

        if not os.path.exists(track_save_dir):
            os.makedirs(track_save_dir)

        track_save_path = os.path.join(track_save_dir, title + '.mp3')

        process = 'wget --output-document %s %s' % (track_save_path, url)
        subprocess.call(process, shell=True)

    print('Total skipped files: %d' % skipped_songs_count)


if __name__ == '__main__':
    main()
