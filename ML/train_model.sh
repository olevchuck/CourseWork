#!/bin/bash

./get_data.sh
cd ./data_convertors
./run_all_data_convertors.sh
cd ..
python create_model.py
