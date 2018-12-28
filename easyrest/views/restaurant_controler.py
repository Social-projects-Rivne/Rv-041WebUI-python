from pyramid.view import view_config
from pyramid.response import Response

from pyramid.httpexceptions import HTTPNotFound

from sqlalchemy.exc import DBAPIError

from json import dumps

from ..models.Restaurant import Restaurant
# from ..models.Tag import Tag

def asign_tags(rests):
    rests_dict = [rest.as_dict() for rest in rests]
    for i, rest in enumerate(rests):
        rests_dict[i]["id"] = "restaurantId" + rests_dict[i]["id"]
        tags = rest.tag
        tags_list = [tag.as_dict() for tag in tags]
        for tag in tags_list:
            tag["id"] = "tagId" + str(tag["id"])
        rests_dict[i].update({"tags": tags_list})
    return rests_dict


@view_config(route_name='get_restaurant', renderer='json', request_method='GET')
def get_restaurant_controler(request):
    def return_all():
        rests = request.dbsession.query(Restaurant).all()
        rests_dict = asign_tags(rests)
        
        response = Response(body=dumps({"data":rests_dict, "name": "get_restaurant" }))
        return response

    params = request.GET
    id = params.getall("id")[0] if len(params.getall("id")) != 0 else None
    if id is not None and id != '':
        query = request.dbsession.query(Restaurant).filter(Restaurant.id == id).all()
        rests_dict = asign_tags(query)
        response = Response(body=dumps({"data":rests_dict, "name": "get_restaurant_by_id" }))
    else:
        response = return_all()


    return response