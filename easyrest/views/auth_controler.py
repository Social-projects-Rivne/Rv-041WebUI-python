"""
"""
import datetime as dt

from pyramid.view import view_config
from pyramid.security import remember
from pyramid.authentication import AuthTicket
from bcrypt import hashpw, checkpw

from ..scripts.json_helpers import wrap
from ..models.user import User
from ..models.token import Token


@view_config(route_name='login', renderer='json', request_method='GET')
def login_get(request):
    user_list = request.dbsession.query(User).all()
    data = []
    for user in user_list:
        tokens = user.token
        tokens = [token.as_dict() for token in tokens]
        user = user.as_dict()
        user.update({"tokens": tokens})
        print(user)
        data.append(user)
    return wrap(data, True, '')


@view_config(route_name='login', renderer='json', request_method='POST')
def login_post(request):
    req_json = request.json_body
    email, password = req_json["email"], req_json["password"]
    user = request.dbsession.query(User).filter(User.email == email).first()
    if user is None:
        return wrap([email], False, "No such user %s" % (user))
    if user.password != password:
        return wrap([password], False, "Wrong password %s" % (password))
    # request.headers = remember(request, user.name)
    token = AuthTicket('sharedsecret', '', request.remote_addr).cookie_value()
    print(token)
    t_model = Token(
        token=token,
        date_created=dt.datetime.now(),
        date_last_use=dt.datetime.now()
    )
    user.token.append(t_model)

    return wrap([token])


@view_config(route_name='login', renderer='json', request_method='PUT')
def login_put(request):
    user = request.user
    print user
    if user is None or user.name not in ('Sergio Ponce', 'Felicia Smith'):
        return wrap([], False, "Forbiden")
    return wrap([])
