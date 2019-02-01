"""
This module describe data model for "tag_association" table
tag_association table filled automatically by SQLalchemy.
It provides many to many relation between restaurant and tag
"""

from sqlalchemy import (
    Column,
    Integer,
    Text,
    ForeignKey,
)
from sqlalchemy.orm import relationship

from .meta import Base


class OrderAssoc(Base):
    """
    The data model of "tag_association" table
    Defines data structure of "tag_association" table
    """
    __tablename__ = 'order_associations'
    id = Column(Integer, primary_key=True)
    quantity = Column(Integer)
    item_id = Column(Integer, ForeignKey('menu_items.id'))
    order_id = Column(Integer, ForeignKey('orders.id'))

    order = relationship('Order')
    item = relationship('MenuItem')
