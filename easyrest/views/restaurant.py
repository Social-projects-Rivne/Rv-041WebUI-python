from pyramid.httpexceptions import HTTPFound
from pyramid.httpexceptions import HTTPNotFound
from pyramid.view import view_config
from pyramid.response import Response
from sqlalchemy.exc import DBAPIError
# exceptions
from sqlalchemy.orm.exc import NoResultFound, MultipleResultsFound


from .. import models


class RestaurantView(object):
    """
    This class describe view of restaurant
    It encapsulate income request.
    Provide method "get_restaurant_controller" that returns
    json with particular restaurant fetching it from database by id.
    If there is no restaurant with such id - rise 404

    In addition - if id will have a special value "all" - all
    restaurants will be returned
    """
    def __init__(self, request):
        self.request = request

    @view_config(route_name='restaurant', renderer='json', request_method='GET')
    def get_restaurant_controller(self):
        # obtain request
        request = self.request
        # check if there are id income request, if not - take all restaurants
        take_all = False
        rest_id = self.request.matchdict['id']
        if rest_id is None:
            take_all = True
        else:
            # check for root
            if rest_id.strip() == 'all':
                take_all = True
            else:
                try:
                    rest_id = int(rest_id)
                except ValueError:
                    response_body = dict(data='', success=False, error='invalid restaurant id')
                    return Response(response_body, content_type='application/json', status=400)
        # .................................................................................................
        # perform DB request
        if take_all:
            try:
                restaurants = request.dbsession.query(models.Restaurant).all()
            except NoResultFound:
                raise HTTPNotFound()
            except DBAPIError:
                response_body = dict(data='', success=False, error='Data base error occurred ')
                return Response(response_body, content_type='application/json', status=500)
            dict_objs = [restaurant.as_dict() for restaurant in restaurants]
            return dict_objs
        else:
            try:
                restaurant = request.dbsession.query(models.Restaurant).filter_by(id=rest_id).one()
            except NoResultFound:
                raise HTTPNotFound()
            except MultipleResultsFound:
                raise HTTPNotFound()
            except DBAPIError:
                response_body = dict(data='', success=False, error='Data base error occurred ')
                return Response(response_body, content_type='application/json', status=500)
            return restaurant.as_dict()
