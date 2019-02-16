"""This module describe data model for "users" table"""

from sqlalchemy import (
    Column,
    Integer,
    Text,
    Date,
    ForeignKey,
    Boolean
)
from sqlalchemy.orm import relationship
from passlib.hash import pbkdf2_sha256

from .meta import Base
from validator import validation
from ..exceptions import ValidationError


class User(Base):
    """The data model of "users" table.

    Defines data structure of "users" table and methods of
    working with the model.

    Relationships:
        User->Restaurant: one to many
        User->Token: one to many
        User->UserStatus: one to one
    """

    CLIENT = 1
    OWNER = 2
    MODERATOR = 3
    ADMIN = 4
    ADMINISTRATOR = 5
    WAITER = 6

    __tablename__ = 'users'
    id = Column(Integer, primary_key=True)
    name = Column(Text)
    email = Column(Text, unique=True)
    phone_number = Column(Text)
    birth_date = Column(Date)
    password = Column(Text)
    role_id = Column(Integer, ForeignKey('user_roles.id'), default=1)
    is_active = Column(Boolean, default=False)

    tokens = relationship('Token')
    role = relationship('UserRole')
    restaurants = relationship('Restaurant')
    orders = relationship('Order')

    @staticmethod
    def add(database, form_data, role=CLIENT):
        """Method for writing user data to a database.

        Method gets the database session and form data.
        Validates form inputs according to json schema,
        hashes the password and writes everything into the database.

        :param database: Database session
        :param (dict) form_data: JSON-decoded variant of the form inputs
        :param (int) role: Settable role. If not specified, the role "Client" is established.
        :raise ValidationError: If email exists in the database.
        """
        schema = {
            "description": "Validate form inputs",
            "type": "object",
            "properties": {
                "name": {"type": "string"},
                "email": {"type": "string", "format": "email"},
                "password": {"type": "string", "minLength": 8}
            },
            "required": ["name", "email", "password"]
        }
        validation(schema, form_data)
        email = form_data['email']
        email_in_database = database.query(User.email).filter(User.email == email).scalar()
        if email_in_database is not None:
            raise ValidationError('already exist', email)
        name = form_data['name']
        password = form_data['password']
        password_hash = pbkdf2_sha256.hash(password)

        database.add(User(name=name, email=email, password=password_hash, role_id=role))
