"""
This module describe data model for "tag" table
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
    total_price = Column(Numeric(precision=10, scale=2), default=0)
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

    def change_status(self, request, new_status, action):
        """ NOT FOR MERGE
        external usage
            order = request.dbsession.query(Order).filter(
                Order.id == order_id, Order.user_id == request.token.user.id).first()
            order.change_status(request/role, new_status, action?)
        """
        status, role = self.status, request.token.user.role.name
        grahp = {
            ("Draft", "Client", "Submit"): "Waiting for confirm",
            # Date +-, status
            ("Draft", "Client", "Remove"): "Removed",
            # status
            ("Waiting for confirm", "Client", "Undo"): "Draft",
            # status,  comment?
            ("Waiting for confirm", "Administrator", "Reject"): "Declined",
            # status, comment?
            ("Waiting for confirm", "Administrator", "Accept"): "Accepted",
            # status
            ("Declined", "Client", "Remove"): "Removed",
            # status
            ("Declined", "Client", "Edit"): "Draft",
            # status
            ("Declined", "Client", "Ok"): "History",
            # status
            ("History", "Client", "Reorder"): "Draft",
            # status
            ("Accepted", "Administrator", "Cancel"): "Declined",
            # status comment?
            ("Accepted", "Administrator", "Asign waiter"): "Asigned waiter",
            # status waiter_id
            ("Accepted", "Waiter", "Asign waiter"): "Asigned waiter",
            # status waiter_id
            ("Accepted", "Client", "Edit"): "Draft",
            # status
            ("Asigned waiter", "Waiter", "Start order"): "In progress",
            # status
            ("In progress", "Administrator", "Client failed"): "Failed",
            # status comment? evaluation?
            ("In progress", "Client", "Rest failed"): "Failed",
            # status comment? evaluation?
            ("In progress", "Waiter", "Close order"): "Waiting for feedback",
            # status comment?
            ("Failed", "Moderator", "Reviewed"): "History",
            # status comment?
            ("Waiting for feedback", "Client", "Feedback"): "History",
            # status comment?
            ("Waiting for feedback", "Client", "Skip"): "History"
            # status
        }
        # use example
        new_status = graph[(status, role, action)]

        graph_new_v1 = {
            ("Draft", "Waiting for confirm"): {
                "roles": ["Client"],
                "set_date": True
            },
            ("Draft", "Removed"): {
                "roles": ["Client"],
            },
            ("Waiting for confirm", "Draft"): {
                "roles": ["Client"],
            },
            ("Waiting for confirm", "Declined"): {
                "roles": ["Administrator"],
            },
            ("Waiting for confirm", "Accepted"): {
                "roles": ["Administrator"],
            },
            ("Declined", "Removed"): {
                "roles": ["Client"],
            },
            ("Declined", "Draft"): {
                "roles": ["Client"],
            },
            ("Declined", "History"): {
                "roles": ["Client"],
            },
            ("Accepted", "Declined"): {
                "roles": ["Administrator"],
            },
            ("Accepted", "Asigned waiter"): {
                "roles": ["Administrator", "Waiter"],
                "set_waiter": True
            },
            ("Accepted", "Draft"): {
                "roles": ["Client"],
            },
            ("History", "Draft"): {
                "roles": ["Client"],
            },
            ("Asigned waiter", "In progress"): {
                "roles": ["Waiter"],
            },
            ("In progress", "Failed"): {
                "roles": ["Administrator"],
            },
            ("In progress", "Failed"): {
                "roles": ["Client"],
            },
            ("In progress", "Waiting for feedback"): {
                "roles": ["Waiter"],
            },
            ("Waiting for feedback", "History"): {
                "roles": ["Client"],
            },
            ("Failed", "History"): {
                "roles": ["Moderator"],
            }
        }
        # use example
        d = graph[(status, new_status)]
        if role not in d["roles"]:
            raise HTTPForbidden("Wrong role")
        if d.get("set_waiter", False):
            # set waiter id
        oreder.status = new_status

        graph_new_v2 = {
            ("Draft"): {
                "role": "Client",
                "actions": ["Submit", "Remove"],
                "new_status": ["Waiting for confirm", "Removed"]
                "set_date": True
            },
            ("Waiting for confirm"): {
                "role": "Client",
                "actions": ["Undo"],
                "new_status": ["Draft"]
            },
            ("Waiting for confirm"): {
                "role": "Administrator",
                "actions": ["Reject", "Accept"],
                "new_status": ["Declined", "Accepted"]
            },
            ("Declined"): {
                "role": "Client",
                "actions": ["Remove", "Edit", "Ok"],
                "new_status": ["Removed", "Draft", "History"]
            },
            ("History"): {
                "role": "Client",
                "actions": ["Reorder"],
                "new_status": ["Draft"]
            },
            ("Accepted"): {
                "role": "Administrator",
                "actions": ["Cancel", "Asign waiter"],
                "new_status": ["Declined", "Asigned waiter"]
                "set_waiter": True
            },
            ("Accepted"): {
                "role": "Waiter",
                "actions": ["Asign waiter"],
                "new_status": ["Asigned waiter"],
                "set_waiter": True
            },
            ("Accepted"): {
                "role": "Client",
                "actions": ["Edit"],
                "new_status": ["Draft"]
            },
            ("Asigned waiter"): {
                "role": "Waiter",
                "actions": ["Start order"],
                "new_status": ["In progress"]
            },
            ("In progress"): {
                "role": "Administrator",
                "actions": ["Client failed"],
                "new_status": ["Failed"]
            },
            ("In progress"): {
                "role": "Client",
                "actions": ["Rest failed"],
                "new_status": ["Failed"]
            },
            ("In progress"): {
                "role": "Waiter",
                "actions": ["Close order"],
                "new_status": ["Waiting for feedback"]
            },
            ("Failed"): {
                "role": "Moderator",
                "actions": ["Reviewed"],
                "new_status": ["History"]
            },
            ("Waiting for feedback"): {
                "role": "Client",
                "actions": ["Feedback", "Skip"],
                "new_status": ["History", "History"]
            }
        }
        # use example
        d = graph[(status)]
        if role != d["role"]:
            raise HTTPForbidden("Wrong role")
        if action not in d["actions"]:
            raise HTTPForbidden("Wrong action")
        if d.get("set_waiter", False):
            # set waiter id
        new_status = d["new_status"][d["actions"].index(action)]

        graph_new_v3 = {
            "Draft": {
                "Client": {
                    "Waiting for confirm": {
                        "set_date": True,
                        "set_comment": True
                    },
                    "Removed": {},
                }
            },
            "Waiting for confirm": {
                "Client": {
                    "Draft": {},
                },
                "Administrator": {
                    "Declined": {
                        "set_comment": True
                    },
                    "Accepted": {
                        "set_comment": True
                    },
                }
            },
            "Declined": {
                "Client": {
                    "Draft": {},
                    "Removed": {},
                    "History": {},
                }
            },
            "History": {
                "Client": {
                    "Draft": {},
                }
            },
            "Accepted": {
                "Administrator": {
                    "Declined": {
                        "set_comment": True
                    },
                    "Asigned waiter": {
                        "set_waiter": True
                    },
                },
                "Waiter": {
                    "Asigned waiter": {
                        "set_waiter": True
                    }
                },
                "Client": {
                    "Draft": {}
                }
            },
            "In progress": {
                "Administrator": {
                    "Failed": {},
                },
                "Client": {
                    "Failed": {},
                },
                "Waiter": {
                    "Waiting for feedback": {},
                }
            },
            "Waiting for feedback": {
                "Client": {
                    "History": {},
                }
            },
            "Failed": {
                "Moderator": {
                    "History": {},
                }
            },
        }
        # use example
        try:
            d = graph[status][role][new_status]
        except KeyError:
            raise HTTPForbidden("Something wrong")
        if d.get("set_waiter", False):
            # set waiter id
        order.status = new_status
