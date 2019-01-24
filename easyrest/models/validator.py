import jsonschema
from jsonschema.validators import Draft4Validator


def validation(schema, data):
    rules = Draft4Validator(schema, format_checker=jsonschema.FormatChecker())
    errors = sorted(rules.iter_errors(data), key=lambda e: e.path)
    if errors:
        raise Exception('Validation error. Invalid values incoming fields.')
    return True
