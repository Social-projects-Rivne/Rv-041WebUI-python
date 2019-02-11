"""
This module describe data model for "menu_item" table
"""

from sqlalchemy import (
    Column,
    Integer,
    Text,
    ForeignKey,
    Float
)
from sqlalchemy.orm import relationship

from .meta import Base


class MenuItem(Base):
    """
    The data model of "menu_items" table
    Defines data structure of "menu_items" table
    Relationship:
        menu_items -> category (One to One)
    """
    __tablename__ = 'menu_items'
    id = Column(Integer, primary_key=True)
    name = Column(Text)
    description = Column(Text)
    ingredients = Column(Text)
    img = Column(Text)
    price = Column(Float)
    amount = Column(Float)
    menu_id = Column(Integer, ForeignKey('menus.id'))
    category_id = Column(Integer, ForeignKey('categories.id'))

    category = relationship("Category")
    orders = relationship('OrderAssoc')
    menu = relationship('Menu')
