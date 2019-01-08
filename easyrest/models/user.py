"""
This module describe data model for "user" table
"""

from sqlalchemy import (
    Column,
    Integer,
    Text,
    Date,
    String,
    ForeignKey,
)
from sqlalchemy.orm import relationship

from .meta import Base


class User(Base):
    """
    The data model of "user" table
    Defines data structure of "user" table
    """
    __tablename__ = 'user'
    id = Column(Integer, primary_key=True)
    first_name = Column(String, nullable=False)
    last_name = Column(String)
    email = Column(String, unique=True, nullable=False)
    phone = Column(Integer, unique=True)
    dob = Column(Date)
    password = Column(String, nullable=False)
    role = Column(String, default="user")
