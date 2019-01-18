"""This module describes 403 page controler which will be triggered
when HTTPForbidden exception is raised.
It sends json with error title and error message in error field.
"""

from pyramid.view import forbidden_view_config

from ..scripts.json_helpers import wrap


@forbidden_view_config(renderer='json')
def notfound_view(error, request):
    return wrap([], False, "%s" % (error.args[0]))
