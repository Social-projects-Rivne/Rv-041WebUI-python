"""
In this module determines metadata of data base
Also it contains declaration of Base Object for ORM objects in Application
Base object contains custom methods shared by every model.
Attributes:
    NAMING_CONVENTION (dict): naming convention for SQLAlchemy auto name
        generation.
    metadata: SQLAlchemy object created by sqlalchemy.schema.MetaData
        using specified naming convention
"""
import datetime
from decimal import *

from sqlalchemy.ext.declarative import as_declarative
from sqlalchemy.schema import MetaData
from sqlalchemy.orm.collections import InstrumentedList

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
    """
    Determine Base Object for ORM objects in Application
    Contains custom methods sheared by all models:
        __repr__() - to make fancy output by print
        as_dict() - to compile ORM model into python dictionary
    """

    def __repr__(self):
        """Do custom style output by print
        Output format:
        <class <class_name>> ([prop.name = prop.value, ])
        """
        s = '<%s(' % (self.__class__)
        for c in self.__table__.columns:
            s += '%s = %s, ' % (c.name, getattr(self, c.name))
        s += ')'
        print s
        return ""

    def as_dict(self, exclude=[], include=[], with_relations=[], depth=0):
        """Converts model into python dictionary.
        Also support relation unpack to one depth
        To unpack relationship specify its name in with_relations
        Example: model.as_dict(with_relations=["<relation1>", "<relation2>"])
        Pls don`t reassing depth it uses to limit recursive depth
        Args:
            exclude: (list) (str) list of fields to be excluded more priority then include
            include: (list) (str) list of fields to be included
            with_relations: (list) (str) list of relationships to include
            depth: (int) system variable to indicate recursion depth
        Returns:
            dictionary
            {
                [prop.name = prop.value, ... ]
            }
            if it finds datetime object converts it to isoformat.

        """
        data = {}

        if not depth:
            rel_data = {}
            for key in with_relations:
                if key not in self.__mapper__.relationships.keys():
                    continue

                value = getattr(self, key, None)
                if value is not None:
                    if isinstance(value, InstrumentedList):
                        per_key_items = [item.as_dict(exclude=exclude,
                                                      include=include,
                                                      depth=depth + 1) for item in value]
                    else:
                        per_key_items = value.as_dict(exclude=exclude,
                                                      include=include,
                                                      depth=depth + 1)
                    rel_data[key] = per_key_items
            data.update(rel_data)

        for c in self.__table__.columns:
            if c.name in exclude:
                continue
            if include:
                if c.name not in include:
                    continue
            value = getattr(self, c.name)
            if isinstance(value, (datetime.datetime, datetime.date)):
                value = value.isoformat()

            if isinstance(value, Decimal):
                value = float(value)
            data[c.name] = value

        return data
