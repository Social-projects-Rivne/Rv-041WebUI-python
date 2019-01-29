"""
This module describe data model for "menu" table
"""

from sqlalchemy import (
    Column,
    Integer,
    Text,
    ForeignKey,
)
from sqlalchemy.orm import relationship

from .meta import Base


class Menu(Base):
    """
    The data model of "menus" table
    Defines data structure of "menus" table
    Relationship: 
        menus -> menu_items (One to Many)
    """
    __tablename__ = 'menus'
    id = Column(Integer, primary_key=True)
    name = Column(Text)
    image = Column(Text)
    rest_id = Column(Integer, ForeignKey('restaurants.id'))

    menu_items = relationship("MenuItem")
