class BaseError(Exception):
    """Base class for easyrest exceptions"""
    pass


class ValidationError(BaseError):
    """Exception raised on validation mismatch
    """

    def __init__(self, data, msg=""):
        self.data = data
        self.msg = msg

    def __str__(self):
        base = "Validation Error"
        base += ": %s " % self.msg
        base += str(self.data)
        return base
