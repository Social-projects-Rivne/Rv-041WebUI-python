"""This script populate Data base with fake data."""

from random import randint, seed

from faker import Faker

from tags_data import Tags
from ..models import Tag, Menu, Restaurant, MenuItem


def fill_db(session):
    """
    fill Data base with fake data
    Args:
        session (session object): current session to extract db engine
        using session.get_bind()
    """

    fake = Faker()
    # initialize seeds
    fake.seed(4321)
    seed(4321)  # for randint

    # initialize containers for model objects
    # so later we can use session.add_all()
    # to insert data and maintain relations
    Rest_models = []
    # create tag models using data from tags_data.py
    # **tag extract from object pairs and pass
    # it as key=value arguments
    Tags_models = [Tag(**tag) for tag in Tags]

    owners = [fake.name(), fake.name(), fake.name()]

    for i in range(10):
        rest = {
            "name": fake.company(),
            "description": fake.text(max_nb_chars=50),
            "addres_id": fake.address(),
            "owner_id": owners[randint(0, 2)],
            "phone": fake.msisdn(),
            "work_hours": [
                fake.time(pattern="%H:%M", end_datetime=None),
                fake.time(pattern="%H:%M", end_datetime=None)
            ]
        }

        menu_model = Menu(name=fake.company())
        rest_model = Restaurant(**rest)

        Menu_item_models = []
        menu_item_number = 10

        for i in range(menu_item_number):
            menu_item = {
                "name": fake.domain_word(),
                "description": fake.text(max_nb_chars=200),
                "ingredients": fake.sentence(
                    nb_words=6,
                    variable_nb_words=True,
                    ext_word_list=None)
            }
            menu_item_model = MenuItem(**menu_item)
            Menu_item_models.append(menu_item_model)

        # using model relationship defined in models.restaurant
        # asign menu to restaurant
        rest_model.menu = menu_model

        # using model relationship defined in models.menu
        # asign menu_items to menu
        rest_model.menu.menu_item = Menu_item_models

        # define random number of tags for each restaurant
        tag_number = randint(0, len(Tags) - 1)
        # container for tags
        related_tags = []
        for i in range(tag_number):
            # chose random tag
            tag_id = randint(0, len(Tags) - 1)
            item = Tags_models[tag_id]
            # make sure that tag will not repeat
            if item not in related_tags:
                related_tags.append(item)

        # using model relationship defined in models.restaurant
        # asign tag to restaurant
        rest_model.tag = related_tags

        Rest_models.append(rest_model)

    # insert data into database
    session.add_all(Rest_models)
