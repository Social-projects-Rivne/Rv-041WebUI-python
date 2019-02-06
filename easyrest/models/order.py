"""
This module describe data model for "tag" table
"""

from sqlalchemy import (
    Column,
    Integer,
    Text,
    ForeignKey,
    Float
)
from sqlalchemy.orm import relationship
from pyramid.httpexceptions import HTTPNotFound, HTTPBadRequest

from .meta import Base
from .order_assoc import OrderAssoc
from .menu_item import MenuItem


class Order(Base):
    """
    The data model of "tags" table
    Defines data structure of "tags" table
    Has many to many relationship with restaurants, using
    association table tag_associations
    Relationship: tags -> restaurants
    """
    __tablename__ = 'orders'
    id = Column(Integer, primary_key=True)
    date_created = Column(Integer)
    date_booked = Column(Integer)
    status = Column(Text, default="Draft")
    table = Column(Integer, default=0)
    total_price = Column(Float, default=0)
    user_id = Column(Integer, ForeignKey('users.id'))
    rest_id = Column(Integer, ForeignKey('restaurants.id'))

    items = relationship("OrderAssoc")
    user = relationship("User")
    restaurant = relationship("Restaurant")

    # Designed to be called from instance of order
    # Exm:
    #   order = request.dbsession.query(Order).get(order_id)
    #   order.get_items(request.dbsession)
    def get_item(self, session, item_id, exclude=[], include=[]):
        item = session.query(MenuItem).filter(
            MenuItem.id == item_id, MenuItem.id == OrderAssoc.item_id, OrderAssoc.order_id == self.id).first()
        return item.as_dict(exclude=exclude, include=include)

    def get_items(self, session, exclude=[], include=[]):
        model = self.items
        items = []
        for item in model:
            food = item.food
            d = food.as_dict(exclude=exclude, include=include)
            d.update({"quantity": item.quantity})
            d.update({"q_id": item.id})
            items.append(d)
        return items

    def add_item(self, session, quantity, item_id):
        q = OrderAssoc(quantity=quantity)
        food = session.query(MenuItem).get(item_id)
        if food is None:
            raise HTTPNotFound("Item id did not exist")
        if food.menu.rest_id != self.rest_id:
            raise HTTPNotFound("Item id did not consist with restaurant")

        # dublicate check
        flag = session.query(session.query(OrderAssoc).filter(
            OrderAssoc.item_id == item_id, OrderAssoc.order_id == self.id).exists()).scalar()
        if flag:
            raise HTTPBadRequest("Item dublication in order")

        q.food = food
        self.items.append(q)

    def remove_item(self, session, item_id):
        item = session.query(OrderAssoc).filter(
            OrderAssoc.item_id == item_id, OrderAssoc.order_id == self.id)
        items_delited = item.delete()
        return items_delited

    def change_quantity(self, session, item_id, value):
        item = session.query(OrderAssoc).filter(
            OrderAssoc.order_id == self.id, OrderAssoc.item_id == item_id).first()

        if item is None:
            raise HTTPNotFound("Item or order not found")

        item.quantity = value

        return item

    def count_total(self):
        total = 0
        for item in self.items:
            q = item.quantity
            p_per_item = item.food.price if item.food.price is not None else 3.50
            total += q * p_per_item
        self.total_price = total
        return self.total_price
