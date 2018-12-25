# RV-041WebUI/Python

## Install instructions
### Project requaire Python 2.7
On ubuntu:
1. Install essential for pip
<code>sudo apt-get install python-pip python-dev build-essential</code>
2. Install pip for python 2.7
<code>sudo easy_install pip</code>
3. Install virtualenv
<code>sudo pip install --upgrade virtualenv</code>
4. Create virtualenv
<code>virtualenv ~/venv/RV-041</code>
6. Install posgresql
<code>sudo apt-get install postgresql postgresql-contrib</code>
7. Configure posgres db 
<code>
sudo -i -u postgres
psql
CREATE USER admin WITH ENCRYPTED PASSWORD 123;
CREATE DATABASE "EasyRest" OWNER admin;
</code>
in /etc/postgresql/9.x/main/pg_hba.conf add lines to the bottom of the file:
<code>
local   <dbname>    <usrname>                                    peer
host    <dbname>   <usrname>            127.0.0.1        md5 (edited) 
</code>
and then restart postqresql service
<code>$ service postgresql restart</code>
8. Install pip packeges inside virtual env
<code>(venv) pip install -e .</code>
9. Initialize db using alembic revision
<code>
(venv) alembic -c development.ini upgrade head
</code>
10. Initialize db
<code>(venv) initialize_easyrest_db development.ini</code>
11. Run tests
<code>(venv) pytest</code>
12. Run project
<code>pserve development.ini</code>

For convinience you can add aliases below (to your .bash_aliases):
<code>
alias s='/home/class/Downloads/sublime_text_3/sublime_text'
alias envoff='deactivate'
alias envon='source ~/venv/RV-041/bin/activate'
</code>
