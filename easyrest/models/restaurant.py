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
    Defines data structure of "restaurants" table
    Has many to many relationship with tags, using
    association table tag_associations
    "status" attribute is Integer, where 0-waiting for confirmation, 1-active (confirmed), 2-archived
    Relationship:
        restaurants -> menus
        restaurants -> tags
    """
    __tablename__ = 'restaurants'
    id = Column(Integer, primary_key=True)
    name = Column(Text)
    address_id = Column(Text)
    description = Column(Text)
    phone = Column(Text)
    owner_id = Column(Integer, ForeignKey('users.id'))
    status = Column(Integer)

    menu = relationship("Menu")
    user = relationship("User")
    tag = relationship(
        "Tag",
        secondary="tag_associations")
