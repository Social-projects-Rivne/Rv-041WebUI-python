"""
This module describe data model for "restaurants" table
"""

from sqlalchemy import (
    Column,
    Integer,
    Text,
    ForeignKey,
)
from sqlalchemy.orm import relationship

from .meta import Base


class Restaurant(Base):
    """
    The data model of "restaurants" table
    Defines data structure of "restaurants" table
    Has many to many relationship with tags, using
    association table tag_associations
    Relationship:
        restaurants -> menus
        restaurants -> tags
    """
    __tablename__ = 'restaurants'
    id = Column(Integer, primary_key=True)
    name = Column(Text)
    description = Column(Text)
    addres_id = Column(Text)
    owner_id = Column(Text)
    phone = Column(Text)
    work_hours = Column(Text)
    menu_id = Column(Integer, ForeignKey('menus.id'))

    menu = relationship("Menu")
    tag = relationship(
        "Tag",
        secondary="tag_associations")
