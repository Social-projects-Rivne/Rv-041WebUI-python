import os

from setuptools import setup, find_packages

requires = [
    'plaster_pastedeploy',
    'pyramid',
    'pyramid_debugtoolbar',
    'pyramid_jinja2',
    'waitress',
    'pyramid_retry',
    'pyramid_tm',
    'SQLAlchemy',
    'transaction',
    'zope.sqlalchemy',
    'psycopg2-binary',
    'faker',
]

tests_require = [
    'WebTest >= 1.3.1',  # py3 compat
    'pytest >= 3.7.4',
    'pytest-cov',
]

setup(
    name='easyrest',
    version='0.0',
    description='EasyRestaurant',
    classifiers=[
        'Programming Language :: Python',
        'Framework :: Pyramid',
        'Topic :: Internet :: WWW/HTTP',
        'Topic :: Internet :: WWW/HTTP :: WSGI :: Application',
    ],
    author='',
    author_email='',
    url='',
    keywords='web pyramid pylons',
    packages=find_packages(),
    include_package_data=True,
    zip_safe=False,
    extras_require={
        'testing': tests_require,
    },
    install_requires=requires,
    entry_points={
        'paste.app_factory': [
            'main = easyrest:main',
        ],
        'console_scripts': [
            'initialize_easyrest_db=easyrest.scripts.initialize_db:main',
        ],
    },
)
