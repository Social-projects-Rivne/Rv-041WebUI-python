from sqlalchemy import (
    Column,
    Index,
    Integer,
    Text,
)

from .meta import Base


class Tag(Base):
    __tablename__ = 'Tag'
    id = Column(Integer, primary_key=True)
    name = Column(Text)

    def __repr__(self):
        return "<Tag(id='%s', name='%s')>" % (
                            self.id, self.name)
