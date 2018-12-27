import argparse
import sys

from pyramid.paster import bootstrap, setup_logging
from sqlalchemy.exc import OperationalError

from ..models.meta import Base
from ..models.Tag import Tag

from test_data import Add


def setup_models(dbsession):
    engine = dbsession.get_bind()
    Base_rez = Base.metadata.create_all(engine)


def fill_models(dbsession):
    names = ["pizza", "beer", "japanese", "ukrainian"]
    for name in names:
        model_item = Tag(name=name)
        dbsession.add(model_item)
    Add()


def drop_models(dbsession):
    engine = dbsession.get_bind()
    Base_rez = Base.metadata.drop_all(engine)


def parse_args(argv):
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
    args = parse_args(argv)
    setup_logging(args.config_uri)
    env = bootstrap(args.config_uri)

    try:
        with env['request'].tm:
            dbsession = env['request'].dbsession
            if args.drop:
                drop_models(dbsession)
                print('Droped')
            else:
                setup_models(dbsession)
                print('Created')
            if args.fill:
                fill_models(dbsession)
                print("filled")
    except OperationalError:
        print('Error in init_db.py')
