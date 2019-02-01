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
from pyramid.httpexceptions import HTTPNotFound

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
    status = Column(Text)
    table = Column(Integer, default=0)
    total_price = Column(Float, default=0)
    user_id = Column(Integer, ForeignKey('users.id'))
    rest_id = Column(Integer, ForeignKey('restaurants.id'))

    quantity = relationship("OrderAssoc")
    user = relationship("User")
    restaurant = relationship("Restaurant")

    # Designed to be called from instance of order
    # Exm:
    #   order = request.dbsession.query(Order).get(order_id)
    #   order.get_items(request.dbsession)
    def get_items(self, session):
        model = self.quantity
        items = []
        for i, item in enumerate(model):
            item1 = item.item
            d = item1.as_dict()
            d.update({"quantity": item.quantity})
            d.update({"q_id": i})
            items.append(d)
        return items

    def add_item(self, session, quantity, item_id):
        q = OrderAssoc(quantity=quantity)
        i = session.query(MenuItem).get(item_id)
        if i is None:
            raise HTTPNotFound("Item id did not exist")
        if i.menu.rest_id != self.rest_id:
            raise HTTPNotFound("Item id did not consist with restaurant")
        # i = session.query(MenuItem).filter(
        #     MenuItem.id == item_id, MenuItem.menu.rest_id == self.rest_id).first()

        q.item = i
        self.quantity.append(q)

    def remove_item(self, session, item_id):
        item = session.query(OrderAssoc).filter(
            OrderAssoc.item_id == item_id, OrderAssoc.order_id == self.id)
        item.delete()

    def change_quantity(self, session, q_id, value):
        try:
            self.quantity[q_id].quantity = value
        except IndexError:
            raise HTTPNotFound("This item doesn`t in your order")
