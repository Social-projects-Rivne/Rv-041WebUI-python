"""
"""

from pyramid.view import view_config
from pyramid.security import remember

from ..scripts.json_helpers import wrap
from ..models.user import User


@view_config(route_name='login', renderer='json', request_method='GET')
def login_get(request):
    data = request.dbsession.query(User).all()
    data = [item.as_dict() for item in data]
    message = str(dir(request))
    return wrap(data, True, message)


@view_config(route_name='login', renderer='json', request_method='POST')
def login_post(request):
    req_json = request.json_body
    email, password = req_json["email"], req_json["password"]
    user = request.dbsession.query(User).filter(User.email == email).first()
    if user is None:
        return wrap([email], False, "No such user")
    if user.password != password:
        return wrap([password], False, "Wrong password")
    remember(request, user.name)
    return wrap(user.as_dict())


@view_config(route_name='login', renderer='json', request_method='PUT')
def login_put(request):
    user = request.user
    print user
    if user is None or user.name not in ('Sergio Ponce', 'Felicia Smith'):
        return wrap([], False, "Forbiden")
    return wrap([])
