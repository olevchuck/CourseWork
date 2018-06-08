#!/bin/bash

if [ ! -f ./data ]; then
	mkdir ./data
fi

cd ./data
wget http://labrosa.ee.columbia.edu/millionsong/sites/default/files/AdditionalFiles/msd_summary_file.h5 
