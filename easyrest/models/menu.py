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
from .category import Category
from .menu_item import MenuItem


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

    def get_items_with_cat(self, session, exclude=[], include=[]):
        result = session.query(MenuItem, Category).filter(
            MenuItem.menu_id == self.id, Category.id == MenuItem.category_id).order_by(Category.name).all()
        data_dict = {}
        cats_list = []
        for item, cat in result:
            category, item_dict = cat.name, item.as_dict(
                exclude=exclude, include=include)
            if category in data_dict:
                data_dict[category].append(item_dict)
            else:
                data_dict[category] = [item_dict]
                cats_list.append(category)

        return (cats_list, data_dict)

    def get_menu(self, session, exclude=[], include=[]):
        pass
