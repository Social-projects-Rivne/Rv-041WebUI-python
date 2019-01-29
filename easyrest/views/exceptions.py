"""Module describes exception templates for pyramid.
Curently describes:
    404 notfound_view,
    403 forbidden_view

"""
from pyramid.view import notfound_view_config
from pyramid.view import forbidden_view_config

from ..scripts.json_helpers import wrap


@forbidden_view_config(renderer='json')
def forbidden_view(error, request):
    """
    Overrided forbidden view for adding specific information to it.
    :param error: object represents error
    :param request: standard Pyramid Request object
    :return: dictionary
    """
    request.response.status_code = 403
    return wrap([], False, "%s" % (error.args[0]))


@notfound_view_config(renderer='json')
def notfound_view(error, request):
    """
    Overrided notfound view for adding specific information to it.
    :param error: object represents error
    :param request: standard Pyramid Request object
    :return: dictionary
    """
    request.response.status_code = 404
    return wrap([], False, "%s: %s" % (error.title, error.args[0]))
