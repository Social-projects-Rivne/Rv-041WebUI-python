from sqlalchemy import (
    Column,
    Index,
    Integer,
    Text,
)

from .meta import Base


class Restaurant(Base):
    """
    The data model of Restaurant table
    Defines data stricture of restaurant table
    """
    __tablename__ = 'Restaurant'
    id = Column(Integer, primary_key=True)
    name = Column(Text, unique=False)
    description = Column(Text)


