"""This script populate Data base with fake data."""

from random import randint, seed
import datetime as dt

from faker import Faker

from tags_data import Tags
from ..models import Tag, Menu, Restaurant, MenuItem, User, UserStatus, Category
from menu_data import Menus, Categories, Meals


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
    # create container for user model
    user_model = []

    # create example user statuses(user types)

    UserStatuses = [
        UserStatus(name='Client'),
        UserStatus(name='Owner'),
        UserStatus(name='Moderator'),
        UserStatus(name='Admin')
    ]

    session.add_all(UserStatuses)

    # Create 5 users with status Client
    Users = [User(name=fake.name(),
                  email=fake.email(),
                  password="123%s" % i,
                  status=UserStatuses[1],
                  phone_number=fake.phone_number(),
                  birth_date=fake.date_of_birth(
                      tzinfo=None, minimum_age=18, maximum_age=100)
                  ) for i in range(5)]

    session.add_all(Users)

    meals_len = len(Meals)

    Cat_models = [Category(**cat_dict) for cat_dict in Categories]

    for i in range(10):
        rest = {
            "name": fake.company(),
            "address_id": fake.address(),
            "description": fake.text(max_nb_chars=200),
            "phone": fake.ean8()
        }

        rest_model = Restaurant(**rest)

        Menu_models = [Menu(**menu_dict) for menu_dict in Menus]

        Menu_items_all_cat = []
        for cat_model in Cat_models:
            menu_item_number = randint(0, 10)
            Menu_item_models = []
            for j in range(menu_item_number):
                menu_item = Meals[randint(0, meals_len-1)]
                menu_item_model = MenuItem(**menu_item)
                menu_item_model.category = cat_model
                Menu_item_models.append(menu_item_model)

            Menu_items_all_cat.extend(Menu_item_models)
        Menu_models[0].menu_items = Menu_items_all_cat

        # using model relationship defined in models.restaurant
        # asign menu to restaurant
        rest_model.menu = Menu_models

        # using model relationship defined in models.restaurant
        # asign one of 5 users to restaurant
        rest_model.user = Users[randint(0, 4)]

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

    # add users
    for i in range(menu_item_number):
        current_user = User(name=fake.name(),
                            email=fake.email(),
                            password="123%s" % i,
                            status=UserStatuses[0],
                            phone_number=fake.phone_number(),
                            birth_date=fake.date_of_birth(tzinfo=None, minimum_age=18, maximum_age=100))
        user_model.append(current_user)

    # insert data into database
    session.add_all(Rest_models)
    session.add_all(user_model)
