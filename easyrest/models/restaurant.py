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
    "status" attribute is Integer, where:
        0-waiting for confirmation,
        1-active (confirmed),
        2-archived
    Relationships:
        waiters: waiters in this restaurant
            Restaurant->User: one to many
        administrator: administrator in this restaurant
            Restaurant->User: many to one (by design but
                suppose to work like one to one)
        owner: owner in this restaurant
            Restaurant->User: many to one (by design but
                suppose to work like one to one)
        tag: tags of this restaurant
            Restaurant -> Tag (Many to Many)
        menu: menus of this restaurant
             Restaurant -> Menu (One to Many)
    """
    __tablename__ = 'restaurants'
    id = Column(Integer, primary_key=True)
    name = Column(Text)
    address_id = Column(Text)
    description = Column(Text)
    description_markup = Column(Text)
    phone = Column(Text)
    owner_id = Column(Integer, ForeignKey('users.id'))
    administrator_id = Column(Integer, ForeignKey('users.id'))
    status = Column(Integer, default=0)
    creation_date = Column(Integer)
    image = Column(Text)

    menu = relationship("Menu")
    owner = relationship("User", foreign_keys="[Restaurant.owner_id]")
    administrator = relationship(
        "User", foreign_keys="[Restaurant.administrator_id]")
    waiters = relationship(
        "User", foreign_keys="[User.restaurant_id]")
    tags = relationship(
        "Tag",
        secondary="tag_associations")
