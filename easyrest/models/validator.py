"""This module describe data validation"""

import logging

import jsonschema
from jsonschema.validators import Draft4Validator

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
