from random import randint
from database import Database
from models import Location

import time

db = Database()

while True:
	db.addSample(latitude = randint(0,100), longitude = randint(0,100), datetime = 2018-14-14 20:13:13)
	time.sleep(25)
