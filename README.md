# RV-041WebUI/Python

## Project require Python 2.7

### Install instructions on ubuntu:

1. Install essential for pip

`sudo apt-get install python-pip python-dev build-essential`

2. Install pip for python 2.7

`sudo easy_install pip`

3. Install virtualenv

`sudo pip install --upgrade virtualenv`

4. Create virtualenv

`virtualenv ~/venv/RV-041`

6. Install posgresql

`sudo apt-get install postgresql postgresql-contrib`

7. Configure posgres db

```
sudo -i -u postgres
psql
CREATE USER admin WITH ENCRYPTED PASSWORD 123;
CREATE DATABASE "EasyRest" OWNER admin;
```

in /etc/postgresql/9.x/main/pg_hba.conf add lines to the bottom of the file:

```
local   <dbname>    <usrname>                                    peer
host    <dbname>   <usrname>            127.0.0.1        md5 (edited)
```

and then restart postqresql service

`$ service postgresql restart`

8. Install pip packeges inside virtual env

`(venv) pip install -e .`

9. Initialize db using alembic revision

`(venv) alembic -c development.ini upgrade head`

10. Initialize db

`(venv) initialize_easyrest_db development.ini`

11. Run tests

`(venv) pytest`

12. Run project

`pserve development.ini`

#####For convinience you can add aliases below (to your .bash_aliases):

```
alias s=`/home/class/Downloads/sublime_text_3/sublime_text`
alias envoff=`deactivate`
alias envon=`source ~/venv/RV-041/bin/activate`
```

---

## Install instructions on windows:

1. Make sure that you have python version 2.7

`python --version`

> After installation Python append paths to python.exe (i.e. C:\Python27) and path to directory Scripts (i.e. C:\Python27\Scripts) in the PATH environment variable.

2. If you are using Python 2 >=2.7.9 downloaded from python.org just make sure to upgrade pip:

`python -m pip install -U pip`

3. Install virtualenv

`pip install virtualenv`

4. Create virtualenv

`virtualenv %VENV%`

6. Activate virtualenv

`%VENV%\Scripts\activate`

7. Upgrade packaging tools in the virtual environment

`(%VENV%) pip install --upgrade pip setuptools`

8. Install pip packeges inside virtual env

`(%VENV%) pip install -e ".[testing]"`

9. Install posgresql and create database

10. Initialize and upgrade the database using Alembic

`(%VENV%) alembic -c development.ini revision --autogenerate -m "init"`

`(%VENV%) alembic -c development.ini upgrade head`

10. Initialize db

`(%VENV%) initialize_easyrest_db development.ini`

11. Run tests

`(%VENV%) pytest`

12. Run project

`pserve development.ini`
