"""
This module describe data model for "users" table
"""

from sqlalchemy import (
    Column,
    Integer,
    Text,
    ForeignKey,
)
from sqlalchemy.orm import relationship

from .meta import Base


class User(Base):
    """
    The data model of "tags" table
    Defines data structure of "tags" table
    Has many to many relationship with restaurants, using
    association table tag_associations
    Relationship: tags -> restaurants
    """
    __tablename__ = 'users'
    id = Column(Integer, primary_key=True)
    name = Column(Text)
    email = Column(Text)
    password = Column(Text)
