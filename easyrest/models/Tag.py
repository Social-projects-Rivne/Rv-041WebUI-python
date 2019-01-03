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
    """
    __tablename__ = 'tag'
    id = Column(Integer, primary_key=True)
    name = Column(Text)
    priority = Column(Integer)
    # tag_agreg_id = Column(Integer, ForeignKey('tag_agreg.id'))

    rest = relationship(
        "Restaurant",
        secondary="tag_association")
