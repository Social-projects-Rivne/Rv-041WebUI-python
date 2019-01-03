"""
This module describe menu controler
This module describes behavior of /tag route
"""

from pyramid.view import view_config
from pyramid.response import Response

from ..scripts.json_helpers import wrap

from ..models.Tag import Tag


@view_config(route_name='get_tags', renderer='json', request_method='GET')
def get_tags_controler(request):
    """GET request controler to return tags
    Args:
        request: current pyramid request
    Returns:
        Json string(not pretty) created from dictionary with format:
            {
                "data": data,
                "success": success,
                "error": error
            }
        Where data is list with tags.
        Style:
            [
                {
                    "id": "tagId" + id
                    "name": (str)
                    "priority": (int)
                }, ]
        If tags not found then returns:
        {
            "data": [],
            "success": False,
            "error": No tags in database
        }
    """
    query = request.dbsession.query(Tag)
    tags = query.all()
    if len(tags) == 0:
        body = warp([], False, "No tags in database")
    else:
        tags_as_dict = [tag.as_dict() for tag in tags]
        for tag in tags_as_dict:
            tag["id"] = "tagId" + str(tag["id"])
        body = wrap(tags_as_dict)
    response = Response(body=body)
    return response
