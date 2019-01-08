"""
This module describe data model for "users" table
"""

from sqlalchemy import (
    Column,
    Integer,
    Text,
    DateTime,
    ForeignKey,
)
from sqlalchemy.orm import relationship

from .meta import Base


class Token(Base):
    """
    The data model of "tags" table
    Defines data structure of "tags" table
    Has many to many relationship with restaurants, using
    association table tag_associations
    Relationship: tags -> restaurants
    """
    __tablename__ = 'tokens'
    id = Column(Integer, primary_key=True)
    token = Column(Text)
    date_created = Column(DateTime)
    date_last_use = Column(DateTime)
    user_id = Column(Integer, ForeignKey('users.id'))