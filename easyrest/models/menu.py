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


class Menu(Base):
    """
    The data model of "menus" table
    Defines data structure of "menus" table
    Relationship: menus -> menu_items
    """
    __tablename__ = 'menus'
    id = Column(Integer, primary_key=True)
    name = Column(Text)

    menu_item = relationship("MenuItem")
