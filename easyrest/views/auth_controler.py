# -*- coding: utf-8 -*-
"""Controler which defines auth behavior
"""

from pyramid.view import view_config
from pyramid.authentication import AuthTicket
from pyramid.httpexceptions import HTTPForbidden, HTTPNotFound, HTTPBadRequest
from passlib.hash import pbkdf2_sha256
import jwt

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
    elif not user.is_active:
        raise HTTPForbidden("Sorry, you have been blocked")

    token = remember(request, user)
    body = {
        "role": user.role.name,
        "token": token,
        "userName": user.name,
        "userImg": user.img
    }

    return wrap(body)


@view_config(route_name='login', renderer='json', request_method='GET')
def check_token(request):
    if request.token is None:
        raise HTTPNotFound("No token for sync")
    data = {
        "token": request.token.token,
        "role": request.token.user.role.name,
        "userName": request.token.user.name,
        "userImg": request.token.user.img
    }
    return wrap(data)

@view_config(route_name='login', renderer='json', request_method='PUT')
def login_openid(request):
    """Controler for recivind google id_token from react redirect. 
    Expects:
        PUT request:
            {'id_token': token}
    Return:
        {
            "data": [],
            "status": True if user added good
                      False if user added bad
        }
    """
    req_json = request.json_body
    id_token = req_json.get("id_token", False)
    if not id_token:
        raise HTTPNotFound("No id_token suplied")
    
    decoded_token = jwt.decode(id_token, 'NrbEQgu9ggA4VJqmdtynWgcs', verify=False, algorithms=['HS256'])

    email = decoded_token.get('email', False)
    new_pass = decoded_token.get('jti', False)
    name = decoded_token.get('name', '')
    img = decoded_token.get('picture', '')

    if not email or not new_pass:
        raise HTTPBadRequest("no email in token")

    user = request.dbsession.query(User).filter_by(email=email).first()
    # check if user exists    
    if user is None:
        form_data = {
            "email": email,
            "password": new_pass,
            "name": name,
            "img": img
        }
        user = User.add(request.dbsession, form_data)
    else:
        upd_data = {}
        if user.name == '':
            upd_data["name"] = name
        if user.img is None or user.img != '':
            upd_data["img"] = img
        User.update(request.dbsession, user, upd_data)

    token = remember(request, user)
    body = {
        "role": user.role.name,
        "token": token,
        "userName": user.name,
        "userImg": user.img
    }

    return wrap(body)
    

@view_config(route_name='login', renderer='json', request_method='DELETE')
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
