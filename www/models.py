import datetime

from sqlalchemy.schema import Column
from sqlalchemy.types import Float
from sqlalchemy.types import Integer
from sqlalchemy.types import DateTime
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

#This models will be used in our DataBase.
#And contains all the data to show in the html.
class Locations(Base):
    __tablename__ = 'locations'
    id=Column(Integer, primary_key=True)
    longitude=Column('longitude', Float)
    latitude=Column('latitude', Float)
    datetime=Column('datetime', DateTime)

#     def __init__(self, name=None, email=None):
#         self.longitude = name
#         self.latitude = email
# datetime
    def serialize(self):	#This function returns the objects data in a easily serializable format.
    	return{
    		'id': self.id,
    		'longitude': self.longitude,
    		'latitude': self.latitude,
            'datetime': self.datetime,
    	}
    


