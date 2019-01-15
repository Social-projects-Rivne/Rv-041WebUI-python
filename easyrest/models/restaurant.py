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
    address_id = Column(Text)
    description = Column(Text)
    phone = Column(Text)
    owner_id = Column(Integer, ForeignKey('users.id'))
    menu_id = Column(Integer, ForeignKey('menus.id'))

    menu = relationship("Menu")
    user = relationship("User")
    tag = relationship(
        "Tag",
        secondary="tag_associations")
