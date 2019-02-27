"""
This module describe data model for "menu_item" table
"""

from sqlalchemy import (
    Column,
    Integer,
    Text,
    ForeignKey,
    Float,
    Numeric
)
from sqlalchemy.orm import relationship
from sqlalchemy.exc import IntegrityError
from pyramid.httpexceptions import HTTPForbidden

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
    price = Column(Numeric(precision=10, scale=2), default=0)
    amount = Column(Numeric())
    menu_id = Column(Integer, ForeignKey('menus.id'))
    category_id = Column(Integer, ForeignKey('categories.id'))

    category = relationship("Category")
    orders = relationship('OrderAssoc')
    menu = relationship('Menu')

    @staticmethod
    def create_item(session, form_data):
        name = form_data["name"]
        description = form_data["description"]
        ingredients = form_data["ingredients"]
        img = form_data["image"]
        price = float(form_data["price"]) * 100
        amount = form_data["value"]
        menu_id = form_data["menuId"]
        category_id = form_data["category"]

        item = MenuItem(name=name, description=description,
                        ingredients=ingredients, img=img, price=price,
                        amount=amount, menu_id=menu_id, category_id=category_id)
        session.add(item)

        try:
            session.flush()
        except IntegrityError:
            session.rollback()
            raise HTTPForbidden("Can't Create Item")

        return item

    def update_item(self, session, form_data):
        name = form_data["name"]
        description = form_data["description"]
        ingredients = form_data["ingredients"]
        img = form_data["image"]
        price = float(form_data["price"]) * 100
        amount = form_data["value"]
        category_id = form_data["category"]

        self.name = name
        self.description = description
        self.ingredients = ingredients
        self.img = img
        self.price = price
        self.amount = amount
        self.category_id = category_id

        return self
