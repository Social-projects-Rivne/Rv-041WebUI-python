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
    The data model of "menu" table
    Defines data structure of "menu" table
    """
    __tablename__ = 'menu'
    id = Column(Integer, primary_key=True)
    name = Column(Text)

    # restaurant = relationship("Restaurant")
    menu_item = relationship("Menu_item")
