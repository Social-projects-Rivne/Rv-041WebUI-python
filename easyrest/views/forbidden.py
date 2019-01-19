"""This module describes 403 page controller which will be triggered
when HTTPForbidden exception is raised.
It sends json with error title and error message in error field.
"""

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
