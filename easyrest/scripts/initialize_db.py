"""
This module initialize Data base. Create tables, fill them
"""


import argparse
import sys
from pyramid.paster import bootstrap, setup_logging
from sqlalchemy.exc import OperationalError

from .. import models
from ..models.restaurant import Restaurant


def setup_models(dbsession):
    """
    This function create Data base, based on declarative_base metadata.
    """
    engine = dbsession.get_bind()
    Base = models.meta.Base.metadata.create_all(engine)


def fill_models(dbsession):
    """
    This function fill Data base with test data.
    If --fill parameter passed.
    """
    names = ["pizza", "beer", "japanese", "ukrainian"]
    for name in names:
        model_item = models.tag_model.Tag(name=name)
        dbsession.add(model_item)
    dbsession.add_all([
        Restaurant(name='3 Elephants', description='some description'),
        Restaurant(name='Father', description='some description 2'),
        ])


def drop_models(dbsession):
    """
    This function drop Data base tables.
    If --drop parameter passed.
    """
    engine = dbsession.get_bind()
    Base = models.meta.Base.metadata.drop_all(engine)


def parse_args(argv):
    """
    This function parse arguments, which were passed.
    It parse 'config_uri', 'config_uri' and '--fill' arguments
    """
    parser = argparse.ArgumentParser()
    parser.add_argument(
        'config_uri',
        help='Configuration file, e.g., development.ini',
    )
    parser.add_argument(
        '--drop',
        help='Drop tables that uses models/meta.py Base class',
        action='store_true'
    )
    parser.add_argument(
        '--fill',
        help='Argument to create tables with content',
        action='store_true'
    )
    return parser.parse_args(argv[1:])


def main(argv=sys.argv):
    """
    This function is entry point for DB initializing script.
    """
    args = parse_args(argv)
    setup_logging(args.config_uri)
    env = bootstrap(args.config_uri)

    try:
        with env['request'].tm:
            dbsession = env['request'].dbsession
            if args.drop:
                drop_models(dbsession)
                print 'Dropped all tables in the database'
            else:
                setup_models(dbsession)
                print 'Created table in the database'
            if args.fill:
                fill_models(dbsession)
                print "Populated the database by testing data"
    except OperationalError:
        print 'Error in init_db.py'
