"""
This module describe data model for "users" table
"""

from sqlalchemy import (
    Column,
    Integer,
    Text,
    Date,
    ForeignKey,
)
from sqlalchemy.orm import relationship
from passlib.hash import pbkdf2_sha256

from .meta import Base


class User(Base):
    """
    The data model of "users" table
    Defines data structure of "users" table
    Relationsips:
        User->Restaurant: one to many
        User->Token: one to many
        User->UserStatus: one to one
    """
    __tablename__ = 'users'
    id = Column(Integer, primary_key=True)
    name = Column(Text)
    email = Column(Text)
    phone_number = Column(Text)
    birth_date = Column(Date)
    password = Column(Text)
    status_id = Column(Integer, ForeignKey('user_statuses.id'))

    tokens = relationship("Token")
    status = relationship('UserStatus')
    restaurants = relationship('Restaurant')

    @staticmethod
    def add(database, form_data):
        name = form_data['name']
        email = form_data['email']
        password = form_data['password']
        password_hash = pbkdf2_sha256.hash(password)

        database.add(User(name=name, email=email, password=password_hash))
