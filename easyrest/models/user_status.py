"""
This module describe data model for "user_statuses" table
"""

from sqlalchemy import (
    Column,
    Integer,
    Text,
    ForeignKey,
)

from .meta import Base


class UserStatus(Base):
    """
    The data model of "user_statuses" table
    Defines data structure of "user_statuses" table
    """
    __tablename__ = 'user_statuses'
    id = Column(Integer, primary_key=True)
    name = Column(Text)
