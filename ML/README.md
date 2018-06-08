# Recommendation system
This folder contain code connected with Recommendation System.

## Installation (for developers):
To use all functionallity and add new you need:
1. Create you own python virtual env:
	``virtualenv env --python=python3.6``
*Note*If you already have python 3.6 you can skip this and next step.
2. Activate virtual env:
	``source ./env/bin/activate``
3. Install all requirements:
	``pip install -r requirements.txt``
4. Download all training metadata:
	``./get_data``
5. Download training data:
    Manualy download data from [https://www.kaggle.com/c/msdchallenge/data](https://www.kaggle.com/c/msdchallenge/data).
6. Add folder ML to $PYTHONPATH:
    Write line ``export PYTHONPATH="/Users/alexkirnas/MusicRecommendationService/ML:$PYTHONPATH"`` to ``.bash_rc`` or ``.bash_profile`` file.

## Downloading pretrained model
You can download our pretrained on MSD data set model (79.5% accuracy on validation set) here: 
[model.pkl](https://drive.google.com/open?id=1UBKXdDvvD4USbJ5giLroEpknPLtPP_zV)

## Model generation
If you want to generate model by yourself, you can just run [script](./train_model.sh) to do so.

## Structure
For recommendation system I propose such structure:

    ML/
    ├── data/
    │   
    ├── data_convertors/
    │   
    ├── env/
    │   
    ├── research/
    │
    └── utils/


Where:

- ``data`` - folder where stored all necessary data (ignored by git)
- ``data_convertors`` - folder that contain scripts for converting all data to transfer-csv and to final csv
- ``env`` - folder with python virtual env (ignored by git)
- ``research`` - folder with features that under research
- ``utils`` - folder where stored useful scripts from other reposetories
