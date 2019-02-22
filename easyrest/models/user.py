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

    @staticmethod
    def update(database, user, form_data):
        """Method for updating user information.

        Method gets the database session and updatable user instance and form data.
        Validates form inputs according to json schema, verifies the uniqueness of
        the received email, and writes everything into the database.
        Also hashed and recorded in the database a new password, if it is received.


        :param database: Database session.
        :param user: Instance of updated user.
        :param form_data: JSON-decoded variant of the form inputs.
        :raise ValidationError: If Email is already exist.
        """
        schema = {
            "description": "Validate form inputs",
            "type": "object",
            "properties": {
                "name": {"type": "string"},
                "email": {"format": "email"},
                "phone_number": {"format": "string"},
                "birth_date": {"format": "string"},
                "password": {"minLength": 8}
            },
            "required": ["name", "email"]
        }
        validation(schema, form_data)
        current_email, new_email = user.email, form_data['email']
        if current_email != new_email:
            email_in_database = database.query(User.email)\
                .filter(User.email == new_email).scalar()
            if email_in_database is not None:
                raise ValidationError('already exist', new_email)
        name = form_data['name']
        password = form_data['password']
        phone_number = form_data['phone_number']
        birth_date = form_data['birth_date']
        if password is not None:
            password_hash = pbkdf2_sha256.hash(password)
            database.query(User).filter_by(id=user.id).update({"password": password_hash})

        database.query(User).filter_by(id=user.id)\
            .update({'name': name, 'email': new_email, 'phone_number': phone_number, 'birth_date': birth_date})
