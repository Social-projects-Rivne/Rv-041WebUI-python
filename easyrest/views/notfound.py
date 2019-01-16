"""This module describes 404 page controller which will be triggered
when HTTPNotFound exception is raised.
It sends json with error title and error message in error field.
"""

from pyramid.view import notfound_view_config

from ..scripts.json_helpers import wrap


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
