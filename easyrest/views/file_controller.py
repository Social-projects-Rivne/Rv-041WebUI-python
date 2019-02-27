import os
import uuid
import shutil

from pyramid.view import view_config
from pyramid.httpexceptions import HTTPBadRequest

from ..auth import restrict_access

img_index = 0


@view_config(
    route_name='file_upload',
    renderer='json',
    request_method='POST'
)
def upload(request):
    global img_index
    filename = request.POST['img'].filename
    input_file = request.POST['img'].file

    if not filename.lower().endswith(('.png', '.jpg', '.jpeg')):
        raise HTTPBadRequest("Wrong file type")

    file_type = filename.split(".")[-1]

    new_filename = uuid.uuid4()

    file_path = os.path.join(
        '%s/easyrest/static/images' % os.getcwd(), '%s%d.%s' % (new_filename,
                                                                img_index,
                                                                file_type))

    temp_file_path = file_path + '~'

    input_file.seek(0)
    with open(temp_file_path, 'wb') as output_file:
        shutil.copyfileobj(input_file, output_file)

    os.rename(temp_file_path, file_path)

    url_root = "http://localhost:6543/api/static/images/%s%s.%s" % (new_filename,
                                                                    img_index,
                                                                    file_type)

    img_index += 1

    return url_root
