"""
Script contains helper functions to work with json such as:
    wrap(): wraper to make response json acording to format
"""
from json import dumps


def wrap(data, success=True, error=None):
    """Function to turn python dictionary from models output to
    json format for futher send with responce
    Args:
        data (list): list of dictionaries representing models output
        error (str): error message, None by default
        success (bool): request status True is request succeeded
            otherwise False
    Returns:
        Json string(not pretty) created from dictionary with format:
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
    return dumps(data_dict)
