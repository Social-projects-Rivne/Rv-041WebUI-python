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


class User(Base):
    """The data model of "users" table.

    Defines data structure of "users" table and methods of
    working with the model.

    Relationships:
        User->Restaurant: one to many
        User->Token: one to many
        User->UserStatus: one to one
    """
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
    def add(database, form_data):
        """Method for writing user data to a database.

        Method gets the database session and form data.
        Validates form inputs according to json schema,
        hashes the password and writes everything into the database.

        :param database: Database session
        :param form_data: JSON-decoded variant of the form inputs

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
        name = form_data['name']
        email = form_data['email']
        password = form_data['password']
        password_hash = pbkdf2_sha256.hash(password)

        database.add(User(name=name, email=email, password=password_hash))

    @classmethod
    def toggle_activity(cls, database, user):
        """Method to switch field state `is_active`.

        The method works as a trigger. The method makes the user active or inactive,
        depending on his current state of activity.

        :param database: Database session.
        :param user: An instance of the user.
        :return: If the user is active, a method is called which makes him inactive.
                 If the user is inactive, a method is called which makes him active.
        """
        if user.is_active is False:
            return cls.set_active(database, user.id)
        return cls.set_inactive(database, user.id)

    @classmethod
    def set_active(cls, database, user_id):
        """The method that makes the user active.

        :param database: Database session.
        :param user_id: An ID of the user whose status need to change to active.
        """
        database.query(User).filter_by(id=user_id).update({"is_active": True})

    @classmethod
    def set_inactive(cls, database, user_id):
        """The method that makes the user inactive.

        :param database: Database session.
        :param user_id: An ID of the user whose status need to change to inactive.
        """
        database.query(User).filter_by(id=user_id).update({"is_active": False})
