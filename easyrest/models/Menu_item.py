from sqlalchemy import (
    Column,
    Integer,
    Text,
    ForeignKey,
)
# from sqlalchemy.orm import relationship

from .meta import Base


class Menu_item(Base):
    __tablename__ = 'menu_item'
    id = Column(Integer, primary_key=True)
    name = Column(Text)
    description = Column(Text)
    ingredients = Column(Text)
    menu_id = Column(Integer, ForeignKey('menu.id'))

    # menu = relationship("Menu")
