"""
"""
import datetime as dt

from pyramid.view import view_config
from pyramid.security import remember, forget
from pyramid.authentication import AuthTicket
from bcrypt import hashpw, checkpw

from ..scripts.json_helpers import wrap
from ..models.user import User
from ..models.token import Token
from ..auth import set_allowd


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
@set_allowd(user_type='')
def login_post(request):
    req_json = request.json_body
    email, password = req_json["email"], req_json["password"]
    user = request.dbsession.query(User).filter(User.email == email).first()
    if user is None:
        return wrap([email], False, "No such user %s" % (user))
    if user.password != password:
        return wrap([password], False, "Wrong password %s" % (password))
    # request.headers = remember(request, user.name)
    res_headers = remember(request, user)

    response = request.response
    response.headers.update(res_headers)

    return wrap([])


@view_config(route_name='login', renderer='json', request_method='DELETE')
def login_del(request):
    token = request.headers.get('X-Auth-Token')
    if token is not None:
        res_headers = forget(token)
        responce = request.responce
        responce.headers.update(res_headers)
    return wrap([])
