"""
This module populate Data base with fake data.
"""

from ..models import *
from random import randint, seed
from faker import Faker
from tags_data import Tags


def fill_db(session):
    """
    fill Data base with fake data
    """

    fake = Faker()
    fake.seed(4321)
    seed(4321)  # for randint

    Rest_models = []
    Tags_models = [Tag(**tag) for tag in Tags]

    for i in range(10):
        rest = {
            "name": fake.company(),
            "addres_id": fake.address(),
            "owner_id": fake.name()
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
            menu_item_model = Menu_item(**menu_item)
            Menu_item_models.append(menu_item_model)

        rest_model.menu = menu_model

        rest_model.menu.menu_item = Menu_item_models

        tag_number = randint(0, len(Tags) - 1)
        related_tags = []
        for i in range(tag_number):
            tag_id = randint(0, len(Tags) - 1)
            item = Tags_models[tag_id]
            if item not in related_tags:
                related_tags.append(item)

        rest_model.tag = related_tags

        Rest_models.append(rest_model)

    session.add_all(Rest_models)
