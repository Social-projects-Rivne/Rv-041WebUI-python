from .. import models

Tags = [
		{
			"name": "sushi",
			"Priority": 5
		},
		{
			"name": "pizza",
			"Priority": 5
		},
		{
			"name": "pub",
			"Priority": 5
		},
		{
			"name": "vegetarian",
			"Priority": 5
		},
		{
			"name": "fast food",
			"Priority": 5
		},
		{
			"name": "kebab",
			"Priority": 4
		},
		{
			"name": "greel",
			"Priority": 4
		},
		{
			"name": "burgers",
			"Priority": 4
		},
		{
			"name": "beer",
			"Priority": 3
		},
		{
			"name": "japanese cuisine",
			"Priority": 3
		},
		{
			"name": "ukrainian cuisine",
			"Priority": 3
		},
		{
			"name": "turkish cuisine",
			"Priority": 3
		},
		{
			"name": "coffee/tea",
			"Priority": 3
		}

	]


def fill_db(session):
	Tags_models = []
	for tag in Tags:
		model = models.Tag.Tag(name=tag["name"], priority=tag["Priority"])
		Tags_models.append(model)



	session.add_all(Tags_models)
 