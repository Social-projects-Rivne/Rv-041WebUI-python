"""Script contains helper functions to work with json such as:
    wrap(): wraper to make response acording to style
    form_dict(): returns dictionary formed from passed keys and values collections as parameters
    date_time_normalize(): function, which normaloze date_time object for proper json serialization
    decimal_time_normalize(): function, which normaloze Decimal object for proper json serialization
"""

import datetime
from decimal import Decimal



def wrap(data=[], success=True, error=None, message=None,):
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
        "error": error,
        "message": message
    }
    return data_dict


def form_dict(record, keys, normalize_datetime=False, normalize_decimal=False):
    """
    this function collide keys from "keys" parameter with values from "data" parameter to form dictionary
    :param record: collection with data
    :param keys: tuple of keys for formed dictionary
    :return: dictionary with data from "data" and keys from "keys"
    """
    result = {}
    for key in keys:
        value = getattr(record, key)
        if normalize_datetime:
            value = date_time_normalize(value)
        if normalize_decimal:
            value = decimal_time_normalize(value)
        result[key] = value
    return result
    

def date_time_normalize(date_time_object):
    """
    this function transfer type to Json recognisable date type
    """
    if isinstance(date_time_object, (datetime.date, datetime.datetime)):
        return date_time_object.isoformat()
    else:
        return date_time_object


def decimal_time_normalize(decimal_object):
    """
    this function transfer type to Json recognisable float type
    """
    if isinstance(decimal_object, Decimal):
        return float(decimal_object)        
    else:
        return decimal_object
