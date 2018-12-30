"""
This module describe 2 views - for restaurant and restaurant list
For this reason it contains 2 functions: "get_restaurants_controller" and
"get_restaurant_controller" that returns
json with restaurant list and particular restaurant fetching it from database by id respectively.
If there is no restaurant - 404 is rising
"""

from pyramid.httpexceptions import HTTPNotFound
from pyramid.response import Response
from pyramid.view import view_config

from sqlalchemy.exc import DBAPIError
from sqlalchemy.orm.exc import NoResultFound, MultipleResultsFound

from .. import models


@view_config(route_name='restaurants', renderer='json', request_method='GET')
def get_restaurants_controller(request):
    """
    Return json with restaurant collection fetched from database
    If there are no information - 404 is rising
    If there are problem with database - DBAPIError is rising
    """
    # perform DB request
    try:
        restaurants = request.dbsession.query(models.Restaurant).all()
    except NoResultFound:
        raise HTTPNotFound()
    except DBAPIError:
        response_body = dict(data='', success=False, error='Data base error occurred')
        return Response(response_body, content_type='application/json', status=500)
    dict_objs = [restaurant.as_dict() for restaurant in restaurants]
    return dict(data=dict_objs, success=True)


@view_config(route_name='restaurant', renderer='json', request_method='GET')
def get_restaurant_controller(request):
    """
    Return json with one partucular restaurant fetched from database by id
    which came in URL
    If id is not int - ValueError is rising
    If there are multiple rows in result - 404 is rising
    If there are no information - 404 is rising
    If there are problem with database - DBAPIError is rising
    """
    # check if there are id income request, if not - take all restaurants
    rest_id = request.matchdict['id']
    # try to cast string to integer
    try:
        rest_id = int(rest_id)
    except ValueError:
        response_body = dict(data='', success=False, error='invalid restaurant id')
        return Response(response_body, content_type='application/json', status=400)
    # perform DB request
    try:
        restaurant = request.dbsession.query(models.Restaurant).filter_by(id=rest_id).one()
    except NoResultFound:
        raise HTTPNotFound()
    except MultipleResultsFound:
        raise HTTPNotFound()
    except DBAPIError:
        response_body = dict(data='', success=False, error='Data base error occurred')
        return Response(response_body, content_type='application/json', status=500)
    dict_obj = restaurant.as_dict()
    return dict(data=dict_obj, success=True)
