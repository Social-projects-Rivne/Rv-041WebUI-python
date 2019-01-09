import hashlib
import datetime as dt

from pyramid.authentication import AuthTktAuthenticationPolicy
from pyramid.authorization import ACLAuthorizationPolicy
from pyramid.httpexceptions import HTTPNotFound

from .models import User
from .models import Token


class MyAuthenticationPolicy(AuthTktAuthenticationPolicy):
    def authenticated_userid(self, request):
        user = request.user
        if user is not None:
            return user

    def remember(self, request, user):
        hash_str = '%s%s' % (user.email, dt.datetime.now())
        token = hashlib.sha224(hash_str).hexdigest()
        print(token, dt.datetime.now())
        t_model = Token(
            token=token,
            date_created=dt.datetime.now(),
            date_last_use=dt.datetime.now()
        )
        user.token.append(t_model)
        return {'X-Auth-Token': token}

    def forget(self, request, token):
        q = request.dbsession.query(Token).filter(Token.token == token)
        t_model = q.first()
        t_model.delete()
        return {'X-Auth-Token': ''}


def set_allowd(user_type):
    def decorator(func):
        def wrap(request):
            token = request.headers.get('X-Auth-Token')
            if token is not None:
                print(token)
                raise HTTPNotFound
            else:
                return func(request)
        return wrap
    return decorator


def get_user(request):
    user_id = request.unauthenticated_userid
    if user_id is not None:
        user = request.dbsession.query(User).get(user_id)
        return user


def includeme(config):
    settings = config.get_settings()
    authn_policy = MyAuthenticationPolicy(
        "hehlol",
        hashalg='sha512',
    )
    config.set_authentication_policy(authn_policy)
    config.set_authorization_policy(ACLAuthorizationPolicy())
    config.add_request_method(get_user, 'user', reify=True)
