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
    Defines data structure of "restaurant" table
    Relationship:
        restaurant -> menu
        restaurant -> tag
    """
    __tablename__ = 'restaurant'
    id = Column(Integer, primary_key=True)
    name = Column(Text)
    description = Column(Text)
    addres_id = Column(Text)
    owner_id = Column(Text)
    menu_id = Column(Integer, ForeignKey('menu.id'))

    menu = relationship("Menu")
    tag = relationship(
        "Tag",
        secondary="tag_association")
