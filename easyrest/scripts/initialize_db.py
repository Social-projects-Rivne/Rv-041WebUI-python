"""
This module initialize Data base. Create tables, fill them
"""

import argparse
import sys

from pyramid.paster import bootstrap, setup_logging
from sqlalchemy.exc import OperationalError

from ..models.meta import Base
from ..models import *

from insert_exemple_data import fill_db


def setup_models(dbsession):
    """
    This function create Data base, based on declarative_base metadata.
    """
    engine = dbsession.get_bind()
    Base_rez = Base.metadata.create_all(engine)


def fill_models(dbsession):
    """
    This function fill Data base with test data.
    If --fill parameter passed.
    """
    fill_db(dbsession)


def drop_models(dbsession):
    """
    This function drop Data base tables.
    If --drop parameter passed.
    """
    engine = dbsession.get_bind()
    Base_rez = Base.metadata.drop_all(engine)


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
    parser.add_argument(
        '--reset',
        help='Argument to reset db with no content',
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
            if args.reset:
                drop_models(dbsession)
                print 'Database has been droped'
                setup_models(dbsession)
                print 'Database has been created'
            else:
                setup_models(dbsession)
                print 'Database has been created'
            if args.fill:
                fill_models(dbsession)
                print 'Database has been populated by testing data'
    except OperationalError as e:
        print 'OperationalError: {}' % (e)
