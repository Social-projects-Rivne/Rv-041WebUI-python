from sqlalchemy.ext.declarative import as_declarative
from sqlalchemy.schema import MetaData

# Recommended naming convention used by Alembic, as various different database
# providers will autogenerate vastly different names making migrations more
# difficult. See: http://alembic.zzzcomputing.com/en/latest/naming.html
NAMING_CONVENTION = {
    "ix": "ix_%(column_0_label)s",
    "uq": "uq_%(table_name)s_%(column_0_name)s",
    "ck": "ck_%(table_name)s_%(constraint_name)s",
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
    "pk": "pk_%(table_name)s"
}

metadata = MetaData(naming_convention=NAMING_CONVENTION)


@as_declarative(metadata=metadata)
class Base(object):
    def __repr__(self):
        s = '<%s(' % (self.__class__)
        for c in self.__table__.columns:
            s += '%s = %s, ' % (c.name, getattr(self, c.name))
        s += ')'
        return s

    def as_dict(self):
        return {c.name: getattr(self, c.name) for c in self.__table__.columns}
