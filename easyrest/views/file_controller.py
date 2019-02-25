from pyramid.view import view_config

from ..auth import restrict_access


@view_config(
    route_name='file_upload',
    renderer='json',
    request_method='POST'
)
def upload_skadl_(request):
    print request
    # try:
    #     filename = request.POST["img"]
    # except KeyError:
    #     print("heh")

    # print filename
    return "dasdasd"
