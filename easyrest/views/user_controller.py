from pyramid.view import view_config

from ..scripts.json_helpers import wrap
from ..models.user import User


@view_config(route_name='sign_up', renderer='json', request_method='POST')
def sign_up(request):
    form_data = request.json_body
    database = request.dbsession
    try:
        User.add(database, form_data)
        return wrap([], success=True)
    except Exception as e:
        print str(e)
        return wrap([], success=False)
