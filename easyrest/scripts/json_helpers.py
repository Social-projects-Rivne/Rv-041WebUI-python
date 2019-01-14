"""Script contains helper functions to work with json such as:
    wrap(): wraper to make response acording to style
    date_time_normalize(): function, which normalize date_time object for proper json serialization
"""

import datetime


def date_time_normalize(date_time_object):
    """
    function which, if input parameter is "date_time" - converts date_time object to iso format.
    Otherwise - returns this paramether without modifications.
    :param date_time_object: object
    :return: date_time object in iso format when param type is "date_tame", otherwise - return
    param "date_time_object" without modifications
    """
    if isinstance(date_time_object, (datetime.date, datetime.datetime)):
        return date_time_object.isoformat()
    else:
        return date_time_object


def wrap(data, success=True, error=None):
    """Function to turn python dictionary from models output to
    json style for futher send with responce
    Args:
        data: any serializable data
        error (str): error message, None by default
        success (bool): request status True is request succeeded
            otherwise False, True by default
    Returns:
        Dictionary with style:
            {
                "data": data,
                "success": success,
                "error": error
            }"""
    data_dict = {
        "data": data,
        "success": success,
        "error": error
    }
    return data_dict
