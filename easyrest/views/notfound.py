"""This module describes 404 page controller which will be triggered
when HTTPNotFound exception is raised.
It sends json with error title and error message in error field.
"""

from pyramid.view import notfound_view_config

from ..scripts.json_helpers import wrap


@notfound_view_config(renderer='json')
def notfound_view(error, request):
    return wrap([], False, "%s: %s" % (error.title, error.args[0]))
