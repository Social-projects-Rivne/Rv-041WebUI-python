"""This module describe user controller
This module describes behavior of /sign_up route
"""

from pyramid.view import view_config
from pyramid.httpexceptions import HTTPForbidden
from sqlalchemy.exc import IntegrityError

from ..scripts.json_helpers import wrap
from ..models.user import User


@view_config(route_name='sign_up', renderer='json', request_method='POST')
def sign_up(request):
    """Function for user registration.

    This function processes the route /sign_up and tries to write user data to the database.

    - **parameters**, **return**::

        :param request: POST request with json
                            {
                                "name": (str),
                                "email": (str),
                                "password": (str)
                            }
        :return: If the user is successfully added:
                    {
                        "message": null,
                        "data": [],
                        "success": true,
                        "error": null
                    }

                 If errors:
                    {
                        "message": null,
                        "data": [],
                        "success": false,
                        "error": null
                    }

    """
    form_data = request.json_body
    database = request.dbsession
    try:
        User.add(database, form_data)
        database.flush()
        return wrap([], success=True)
    except IntegrityError:
        print "123123"
        database.rollback()
        raise HTTPForbidden("User already exists!")
