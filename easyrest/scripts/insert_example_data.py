"""This script populate Data base with fake data."""

from random import randint, seed
import datetime as dt

from faker import Faker

from tags_data import Tags
from ..models import Tag, Menu, Restaurant, MenuItem, User, UserStatus


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

    # Create 5 users with status Owner
    number_of_owners = 5
    Users = []
    for i in range(number_of_owners):
        user_name = fake.name()
        Users.append(User(name=user_name,
                          email=user_name.lower().replace(" ", "")+'@test.com',
                          password="123%s" % i,
                          status=UserStatuses[1],
                          phone_number="+38098" + str(1000000 + i),
                          birth_date=fake.date_of_birth(tzinfo=None, minimum_age=18, maximum_age=100)
                          )
                     )
    session.add_all(Users)

    # Restaurant status can be 0-waiting for confirmation, 1-active (confirmed), 2-archived
    rest_status = 0

    for i in range(10):
        if rest_status == 3:
            rest_status = 0
        company_name = fake.company()
        rest = {
            "name": company_name,
            "address_id": fake.address(),
            "description": fake.text(max_nb_chars=200),
            "phone": "+380362" + str(100000 + i),
            "status": rest_status
        }
        rest_status = rest_status + 1

        menu_model = Menu(name=company_name + " Menu")
        rest_model = Restaurant(**rest)

        Menu_item_models = []
        menu_item_number = 10

        for i in range(menu_item_number):
            menu_item = {
                "name": "Menu item : " + fake.domain_word(),
                "description": "Description : " + fake.text(max_nb_chars=200),
                "ingredients": "Ingredients : " + fake.sentence(
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
        user_name = fake.name()
        current_user = User(name=user_name,
                            email=user_name.lower().replace(" ", "")+'@test.com',
                            password="123%s" % i,
                            status=UserStatuses[0],
                            phone_number="+38098" + str(1000000 + number_of_owners + i),
                            birth_date=fake.date_of_birth(tzinfo=None, minimum_age=18, maximum_age=100))
        user_model.append(current_user)

    # insert data into database
    session.add_all(Rest_models)
    session.add_all(user_model)
