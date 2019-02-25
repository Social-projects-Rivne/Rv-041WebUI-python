"""This module describe data validation"""

import logging

import jsonschema
from jsonschema.validators import Draft4Validator
from pyramid.httpexceptions import HTTPForbidden
from pyramid.httpexceptions import HTTPBadRequest

from ..exceptions import ValidationError


def validation(schema, data):
    """This function validates the data.

    The function gets the schema template and data for validation.

    :param schema: Schema for validation. See example https://goo.gl/BCH8r6
    :type schema: dict
    :param data: Data to validate
    :type data: dict
    :return: True if validation is ok
    :rtype: bool
    :raise: Validation error if validation with errors
    """
    log = logging.getLogger(__name__)
    rules = Draft4Validator(schema, format_checker=jsonschema.FormatChecker())
    errors = sorted(rules.iter_errors(data), key=lambda e: e.path)
    if errors:
        for error in errors:
            log.error('%s', error.message)
        raise ValidationError(data)
    return True


def check_action_access(user_role, foreign_role, action):
    """This function checks the possibility of the specified action by the user.

    The function checks the rights of the current user's role for other roles.
    access_list = {
      'current_user_role': {
        'other_user_role1': ['action1', 'action2'],
        'other_user_role2': [],
        'other_user_role3': [],
        ...

    :param (str) user_role: User role that requests action
    :param (str) foreign_role: Requested role
    :param (str) action: Action name
    :raise HTTPForbidden: If the action is prohibited
    """
    log = logging.getLogger(__name__)
    user_access_list = {
        'Client': {
            'Client': ['create'],
            'Waiter': [],
            'Administrator': [],
            'Owner': [],
            'Moderator': [],
            'Admin': []
        },
        'Waiter': {
            'Client': ['create'],
            'Waiter': [],
            'Administrator': [],
            'Owner': [],
            'Moderator': [],
            'Admin': []
        },
        'Administrator': {
            'Client': ['create'],
            'Waiter': [],
            'Administrator': [],
            'Owner': [],
            'Moderator': [],
            'Admin': []
        },
        'Owner': {
            'Client': ['create'],
            'Waiter': ['create', 'read', 'update', 'delete'],
            'Administrator': ['create', 'read', 'update', 'delete'],
            'Owner': [],
            'Moderator': [],
            'Admin': []
        },
        'Moderator': {
            'Client': ['create', 'read', 'delete'],
            'Waiter': [],
            'Administrator': [],
            'Owner': ['read'],
            'Moderator': [],
            'Admin': []
        },
        'Admin': {
            'Client': ['create', 'read', 'update', 'delete'],
            'Waiter': [],
            'Administrator': [],
            'Owner': ['create', 'read', 'update', 'delete'],
            'Moderator': ['create', 'read', 'update', 'delete'],
            'Admin': []
        }
    }
    if action not in user_access_list[user_role][foreign_role]:
        log.error('%s can\'t perform "%s" action', user_role, action)
        raise HTTPForbidden('Action not allowed')


def check_json_format(request):
    """Method for checking json format from request.

    :param request: Request with included json.
    :raise HTTPBadRequest: If json has an incorrect format.
    """
    log = logging.getLogger(__name__)
    try:
        request.json_body
    except ValueError as ve:
        log.error(ve.message)
        raise HTTPBadRequest('Incorrect json format')
