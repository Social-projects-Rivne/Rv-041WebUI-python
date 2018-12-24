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

.bash_aliases content

alias s='/home/class/Downloads/sublime_text_3/sublime_text'
alias envoff='deactivate'
alias envon='source /home/class/RV-041WebUI_Python/venv/RV-041/bin/activate'

Install pip packeges inside virtual env
pip install -e

Install posgresql
sudo apt-get install postgresql postgresql-contrib


Setup files
set sqlalchemy.url = postgresql://user@localhost


Download pgadmin4 from https://www.pgadmin.org/download/pgadmin-4-python-wheel/
install it with venv activated
pip install pgadmin4-3.6-py2.py3-none-any.whl
