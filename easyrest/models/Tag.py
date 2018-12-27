from sqlalchemy import (
    Column,
    Integer,
    Text,
    ForeignKey,
)
from sqlalchemy.orm import relationship

from .meta import Base


class Tag(Base):
    __tablename__ = 'tag'
    id = Column(Integer, primary_key=True)
    name = Column(Text)
    priority = Column(Integer)
    # tag_agreg_id = Column(Integer, ForeignKey('tag_agreg.id'))

    tag_agreg = relationship(
        "Restaurant",
        secondary="tag_association")
