"""
This module describe data model for "category" table
"""

from sqlalchemy import (
    Column,
    Integer,
    Text,
    ForeignKey,
)
from sqlalchemy.orm import relationship

from .meta import Base


class Category(Base):
    """
    The data model of "category" table
    Defines data structure of "category" table
    """
    __tablename__ = 'categories'
    id = Column(Integer, primary_key=True)
    name = Column(Text)
