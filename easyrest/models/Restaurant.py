from sqlalchemy import (
    Column,
    Integer,
    Text,
    ForeignKey,
)
from sqlalchemy.orm import relationship

from .meta import Base


class Restaurant(Base):
    __tablename__ = 'restaurant'
    id = Column(Integer, primary_key=True)
    name = Column(Text)
    description = Column(Text)
    addres_id = Column(Text)
    owner_id = Column(Text)
    # tag_agred_id = Column(Integer, ForeignKey('tag_agreg.id'))
    menu_id = Column(Integer, ForeignKey('menu.id'))

    menu = relationship("Menu")
    tag = relationship(
        "Tag",
        secondary="tag_association")
