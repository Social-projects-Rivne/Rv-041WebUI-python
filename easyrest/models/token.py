"""
This module describe data model for "tokens" table
"""

from sqlalchemy import (
    Column,
    Integer,
    Text,
    DateTime,
    ForeignKey,
)
from sqlalchemy.orm import relationship

from .meta import Base


class Token(Base):
    """
    The data model of "tokens" table
    Defines data structure of "tokens" table
    Relationship:
        User->Token: one to many
    """
    __tablename__ = 'tokens'
    id = Column(Integer, primary_key=True)
    token = Column(Text)
    date_created = Column(DateTime)
    date_last_use = Column(DateTime)
    user_id = Column(Integer, ForeignKey('users.id'))

    user = relationship('User')
