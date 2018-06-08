#!/bin/bash

python ./msd_summary_file_to_csv.py  # generate basic csv_file
python ./song_id_str_to_int.py  # generate tracks id
python ./generate_info_and_training_csv.py  # generate csv with tracks meta data and csv with tracks properties
python ./prepare_training_triplets.py  # convert training triples to general format
