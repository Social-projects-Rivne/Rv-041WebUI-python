"""
This module include handling mechanism for HTTP OPTIONS request
"""

from pyramid.view import view_config
from pyramid.response import Response


@view_config(route_name='options_handling', request_method='OPTIONS')
def http_option_response_controller(request):
    """
    When HTTP request with "OPTION" method invoke - this function returns
    returns HTTP 200 to require Preflight request
    Args:
        request: current pyramid request
    Returns:
        Standard Pyramid response with status code 200
    """
    return Response(status='200')
