"""Module for security implementation. Contains functions to add, remove token
(remember, forget), decorator to check access, function to asign token model 
to request. 
"""

import hashlib
import datetime as dt

from pyramid.authentication import AuthTktAuthenticationPolicy
from pyramid.authorization import ACLAuthorizationPolicy
from pyramid.httpexceptions import HTTPForbidden

from .models import User
from .models import Token


def remember(request, user):
    """Function to create token using sha224 algo from
    user email and current datetime. Also creates token model,
    add token to db, for token header. 
    """
    hash_str = '%s%s' % (user.email, dt.datetime.now())
    token = hashlib.sha224(hash_str).hexdigest()
    t_model = Token(
        token=token,
        date_created=dt.datetime.now(),
        date_last_use=dt.datetime.now()
    )
    user.token.append(t_model)
    return {'X-Auth-Token': token}


def forget(request):
    """Function to logout. It gets token from request,
    deletes it from db and form empty header 
    """
    token = request.token
    request.dbsession.delete(token)
    return {'X-Auth-Token': ''}


def restrict_access(user_types):
    """Decorator for restrict access to controler only to users
    whoes status in user_types.
    Args:
        user_types (list): list of strings with user types allowd to acces
            controler
    """
    def decorator(func):
        def wrap(request):
            """Function to check user rights.
            If no token suplied in header -> HTTPForbidden
            If no token in db -> HTTPForbidden
            else:
                run controler (func)
            """
            token = request.token
            if token is not None:
                user_type = token.user.status.name
                if user_type in user_types:
                    return func(request)
                else:
                    raise HTTPForbidden("You can not access this route")           
            else:
                raise HTTPForbidden("Need token for access")
        return wrap
    return decorator


def get_token(request):
    """Function to assign token model to request if 
    token header exists. It check header field 
    (if no token -> None), gets token_id from db
    (if no such token in db -> HTTPForbidden),
    get token model by token_id.
    """
    token = request.headers.get('X-Auth-Token')
    if token is not None:
        token_id = request.dbsession.query(Token.id).filter_by(token=token).first()
        if token_id is not None:
            token = request.dbsession.query(Token).get(token_id)
            return token
        else:
            raise HTTPForbidden("Invalid token")
    else:
        return None


def includeme(config):
    # comented for future secret extraction and storage in *.ini file
    # settings = config.get_settings()
    # add request field token with asigned func get_token
    # token field contains asigned token model
    config.add_request_method(get_token, 'token', reify=True)
