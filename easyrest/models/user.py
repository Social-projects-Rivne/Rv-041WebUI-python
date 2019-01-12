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
# from sqlalchemy.orm import relationship

from .meta import Base


class User(Base):
    """
    The data model of "users" table
    Defines data structure of "users" table
    """
    __tablename__ = 'users'
    id = Column(Integer, primary_key=True)
    name = Column(Text)
    email = Column(Text)
    phone_number = Column(Text)
    birth_date = Column(Date)
    role_id = Column(Integer)  # TODO: add relations
    status_user_id = Column(Integer)  # TODO: add relations
