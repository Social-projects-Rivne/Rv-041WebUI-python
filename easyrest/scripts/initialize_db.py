import argparse
import sys

from pyramid.paster import bootstrap, setup_logging
from sqlalchemy.exc import OperationalError

from .. import models


def setup_models(dbsession):
    """"""
    engine = dbsession.get_bind()
    Base = models.meta.Base.metadata.create_all(engine)


def fill_models(dbsession):
    names = ["pizza", "beer", "japanese", "ukrainian"]
    for name in names:
        model_item = models.tag_model.Tag(name=name)
        dbsession.add(model_item)


def drop_models(dbsession):
    engine = dbsession.get_bind()
    Base = models.meta.Base.metadata.drop_all(engine)


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
                print 'Database has been droped'
            else:
                setup_models(dbsession)
                print 'Database has been created'
            if args.fill:
                fill_models(dbsession)
                print 'Database has been filled'
    except OperationalError as e:
        print 'OperationalError: {}' % (e)
