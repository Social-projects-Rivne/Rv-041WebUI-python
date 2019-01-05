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

from .meta import Base


class TagAssociation(Base):
    """
    The data model of "tag_association" table
    Defines data structure of "tag_association" table
    """
    __tablename__ = 'tag_associations'
    id = Column(Integer, primary_key=True)
    restaurant_id = Column(Integer, ForeignKey('restaurants.id'))
    tag_id = Column(Integer, ForeignKey('tags.id'))
