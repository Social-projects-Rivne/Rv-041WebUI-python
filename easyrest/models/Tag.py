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
    The data model of "tag" table
    Defines data structure of "tag" table
    Relationship: tag -> restaurant
    """
    __tablename__ = 'tag'
    id = Column(Integer, primary_key=True)
    name = Column(Text)
    priority = Column(Integer)

    rest = relationship(
        "Restaurant",
        secondary="tag_association")
