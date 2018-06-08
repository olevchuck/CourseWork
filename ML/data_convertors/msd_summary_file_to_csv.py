import sys
import os

import click
import pandas as pd

from tqdm import tqdm

import utils.hdf5_getters as GETTERS


USELESS_FIELDS = [
  'artist_mbid', 
  'artist_playmeid', 
  'audio_md5', 
  'release_7digitalid', 
  'track_7digitalid',
  'artist_latitude',
  'artist_longitude',
  'artist_location',
  'artist_id',
  'artist_7digitalid',
  'analysis_sample_rate',
]

@click.command()
@click.option('--data_folder', '-f',
              default='../data/',
              help='Path to folder with "msd_summary_file.h5" file')
@click.option('--csv_path', '-c',
              default='../data/msd_summary_file.csv',
              help='Path where to store with "msd_summary_file.h5" file')
@click.option('--limit', '-l',
              default='0',
              help='Numbers of track to load (0 = no limit)')
def main(data_folder, csv_path, limit):
    limit = int(limit)

    h5 = GETTERS.open_h5_file_read(os.path.join(data_folder, 'msd_summary_file.h5'))

    list_useless_functions = ['get_' + field for field in USELESS_FIELDS]
    list_functions_to_skip = ['get_num_songs']  +  list_useless_functions  # if some data is not necessary

    list_valid_function_names = [name for name in dir(GETTERS) if name.startswith('get_') and not name in list_functions_to_skip]
    csv_fields_names = [name[4:] for name in list_valid_function_names]

    num_of_songs_in_h5 = GETTERS.get_num_songs(h5)
    num_of_songs_to_read = min(num_of_songs_in_h5, limit) if limit else  num_of_songs_in_h5

    result_data = []
    for song_index in tqdm(range(num_of_songs_to_read), desc='Parsing h5-file'): 
        song_dict = {}
        for func_index, func_name in enumerate(list_valid_function_names):
            getter_func = getattr(GETTERS, func_name)
            
            value = getter_func(h5, songidx=song_index)
            key = csv_fields_names[func_index]
            
            song_dict[key] = value

        result_data.append(song_dict)

    result_df = pd.DataFrame.from_dict(result_data)
    result_df.to_csv(csv_path, index=False)
    
    h5.close()

if __name__ == '__main__':
    main()
