"""Controler which defines auth behavior
"""

from pyramid.view import view_config
from pyramid.authentication import AuthTicket
from pyramid.httpexceptions import HTTPForbidden, HTTPNotFound
from passlib.hash import pbkdf2_sha256

from ..scripts.json_helpers import wrap
from ..models.user import User
from ..auth import restrict_access, remember, forget


@view_config(route_name='login', renderer='json', request_method='POST')
def login_post(request):
    """Login controler. Check email and password provided by request,
    create token, write token in db, return token in header.
    Expects:
        POST request with json:
        {
            "email": (str),
            "password": (str)
        }
    Return:
        {
            "role": user role string,
            "token": token
        }
    """
    req_json = request.json_body
    email, password = req_json["email"], req_json["password"]
    user = request.dbsession.query(User).filter_by(email=email).first()

    if user is None or not pbkdf2_sha256.verify(password, user.password):
        raise HTTPForbidden("Email or password is invalid")

    token = remember(request, user)
    body = {
        "role": user.role.name,
        "token": token,
        "userName": user.name
    }

    return wrap(body)


@view_config(route_name='login', renderer='json', request_method='GET')
def check_token(request):
    if request.token is None:
        raise HTTPNotFound("No token for sync")
    data = {
        "token": request.token.token,
        "role": request.token.user.role.name,
        "userName": request.token.user.name
    }
    return wrap(data)


@view_config(route_name='login', renderer='json', request_method='DELETE')
@restrict_access(user_types=['Client', 'Owner', 'Moderator', 'Admin', 'Administrator'])
def login_del(request):
    """Controler for logout. Check header for token, find token in db,
    delete token, return empty list with cleare header.
    Expects:
        DELETE request with header:
            {'X-Auth-Token': token}
    Return:
        {
            "data": [],
            "status": True if token deleted
                      False if none was deleted
        }
    """
    status = forget(request)
    return wrap([], status)
