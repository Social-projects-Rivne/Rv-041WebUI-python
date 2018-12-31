"""
This module describe data model for "Restaurants" table
"""

from sqlalchemy import (
    Column,
    Index,
    Integer,
    Text,
)

from .meta import Base


class Restaurant(Base):
    """
    The data model of "Restaurants" table
    Defines data stricture of restaurant table
    """
    __tablename__ = 'restaurants'
    id = Column(Integer, primary_key=True)
    name = Column(Text, unique=False)
    description = Column(Text)


