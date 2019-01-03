"""
This module describe data model for "tag_association" table
"""

from sqlalchemy import (
    Column,
    Integer,
    Text,
    ForeignKey,
)
# from sqlalchemy.orm import relationship

from .meta import Base


class Tag_association(Base):
    """
    The data model of "tag_association" table
    Defines data structure of "tag_association" table
    """
    __tablename__ = 'tag_association'
    id = Column(Integer, primary_key=True)
    restaurant_id = Column(Integer, ForeignKey('restaurant.id'))
    tag_id = Column(Integer, ForeignKey('tag.id'))

    # rest = relationship("Restaurant")
    # tag = relationship("Tag")
