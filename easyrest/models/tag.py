"""
This module describe data model for "tag" table
"""

from sqlalchemy import (
    Column,
    Integer,
    Text,
    ForeignKey,
)
from sqlalchemy.orm import relationship

from .meta import Base


class Tag(Base):
    """
    The data model of "tags" table
    Defines data structure of "tags" table
    Has many to many relationship with restaurants, using
    association table tag_associations
    Relationship: tags -> restaurants
    """
    __tablename__ = 'tags'
    id = Column(Integer, primary_key=True)
    name = Column(Text)
    priority = Column(Integer)
    icon = Column(Text)

    rest = relationship(
        "Restaurant",
        secondary="tag_associations")
