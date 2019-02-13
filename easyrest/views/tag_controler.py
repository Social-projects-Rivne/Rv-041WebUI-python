"""This module describe menu controler
This module describes behavior of /tag route
"""

from pyramid.view import view_config
from pyramid.response import Response
from pyramid.httpexceptions import HTTPNotFound

from ..scripts.json_helpers import wrap
from ..models.tag import Tag
from ..models.tag_association import TagAssociation


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
    tag_query = request.dbsession.query(Tag)
    tags = tag_query.all()
    if not tags:
        raise HTTPNotFound("No tags in database")
    else:
        tags_as_dict = [tag.as_dict() for tag in tags]
        body = wrap(tags_as_dict)
    return body
