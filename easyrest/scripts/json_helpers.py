"""Script contains helper functions to work with json such as:
    wrap(): wraper to make response acording to style
"""


def wrap(data=[], success=True, error=None, message=None,):
    """Function to turn python dictionary from models output to
    json style for futher send with responce
    Args:
        data (list): list of dictionaries representing models output
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
