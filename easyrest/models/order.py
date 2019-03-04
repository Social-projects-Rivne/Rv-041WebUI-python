"""
This module describe data model for "tag" table
"""

from sqlalchemy import (
    Column,
    Integer,
    Text,
    ForeignKey,
    Float,
    Numeric,
)
from sqlalchemy.orm import relationship
from pyramid.httpexceptions import HTTPNotFound, HTTPBadRequest, HTTPForbidden

from .meta import Base
from .order_assoc import OrderAssoc
from .menu_item import MenuItem
from .user import User


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
    creation_time = Column(Integer)
    booked_time = Column(Integer)
    status = Column(Text, default="Draft")
    table = Column(Integer, default=0)
    total_price = Column(Numeric(precision=10, scale=2), default=0)
    user_id = Column(Integer, ForeignKey('users.id'))
    waiter_id = Column(Integer, ForeignKey('users.id'))
    rest_id = Column(Integer, ForeignKey('restaurants.id'))

    items = relationship("OrderAssoc")
    user = relationship(
        "User", foreign_keys="[Order.user_id]")
    waiter = relationship(
        "User", foreign_keys="[Order.waiter_id]")
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
            d.update({"item_id": item.id})
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
        self.count_total()

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
            p_per_item = item.food.price
            total += q * p_per_item
        self.total_price = total
        return self.total_price

    _graph = {
        ("Draft", "Waiting for confirm"): {
            "roles": ["Client", "Owner"],
            "set_date": True
        },
        ("Draft", "Removed"): {
            "roles": ["Client", "Owner"],
        },
        ("Waiting for confirm", "Draft"): {
            "roles": ["Client", "Owner"],
        },
        ("Waiting for confirm", "Declined"): {
            "roles": ["Administrator", "Client"],
        },
        ("Waiting for confirm", "Accepted"): {
            "roles": ["Administrator"],
            "set_date": True
        },
        ("Declined", "Removed"): {
            "roles": ["Client", "Owner"],
        },
        ("Declined", "Draft"): {
            "roles": ["Client", "Owner"],
        },
        ("Declined", "History"): {
            "roles": ["Client", "Owner"],
        },
        ("Accepted", "Declined"): {
            "roles": ["Administrator"],
        },
        ("Accepted", "Asigned waiter"): {
            "roles": ["Administrator", "Waiter"],
            "set_waiter": True
        },
        ("Accepted", "Draft"): {
            "roles": ["Client", "Owner"],
        },
        ("History", "Draft"): {
            "roles": ["Client", "Owner"],
        },
        ("Asigned waiter", "In progress"): {
            "roles": ["Waiter"],
        },
        ("In progress", "Failed"): {
            "roles": ["Administrator"],
        },
        ("In progress", "Failed"): {
            "roles": ["Client", "Owner"],
        },
        ("In progress", "Waiting for feedback"): {
            "roles": ["Waiter"],
        },
        ("In progress", "History"): {
            "roles": ["Waiter", "Client", "Owner", "Administrator"],
        },
        ("Waiting for feedback", "History"): {
            "roles": ["Client", "Owner"],
        },
        ("Failed", "History"): {
            "roles": ["Moderator"],
        }
    }

    def change_status(self, new_status, role, waiter=None, time=None):
        try:
            options = self._graph[(self.status, new_status)]
        except KeyError as e:
            raise HTTPForbidden("Forbidden action % s" % e)

        if role not in options["roles"]:
            raise HTTPForbidden("Wrong role: %s" % role)

        if options.get("set_date", False):
            if time is not None:
                self.booked_time = time

        if options.get("set_waiter", False):
            if waiter is None:
                raise HTTPBadRequest("Waiter not found")
            self.waiter = waiter

        self.count_total()

        self.status = new_status

        return self

    
    def fill_by_other_order(self, session, base_order):
        """
        method fill object of Order with data from another Order object
        """
        base_order_items = base_order.items
        for base_order_item in base_order_items:
            try:
                self.add_item(session, base_order_item.quantity, base_order_item.item_id)
            except HTTPNotFound:
                # skip this product
                continue 
            except HTTPBadRequest:
                # skip this product
                continue
        self.count_total() 
