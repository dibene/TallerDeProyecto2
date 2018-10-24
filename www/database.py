from models import Locations
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base

import os
import json

class Database(object):
    session = None 

    #Database Init
    db_user = os.getenv("DB_USER") if os.getenv("DB_USER") != None else "root"
    db_pass = os.getenv("DB_PASS") if os.getenv("DB_PASS") != None else "root"
    db_host = os.getenv("DB_HOST") if os.getenv("DB_HOST") != None else "db"
    db_name = os.getenv("DB_NAME") if os.getenv("DB_NAME") != None else "locations"
    db_port = os.getenv("DB_PORT") if os.getenv("DB_PORT") != None else "3306"
    Base = declarative_base()
    
    #This function is a Singleton of database
    def getSession(self):
        """Singleton of db connection

        Returns:
            [db connection] -- [Singleton of db connection]
        """
        if self.session == None:
            connection = 'mysql+mysqlconnector://%s:%s@%s:%s/%s' % (self.db_user,self.db_pass,self.db_host,self.db_port,self.db_name)
            engine = create_engine(connection,echo=True)
            connection = engine.connect()
            Session = sessionmaker(bind=engine)
            self.session = Session()
            self.Base.metadata.create_all(engine)

        return self.session
    #END function Singleton of database

    def getLastSample(self):
        session = self.getSession()
        sample = session.query(Locations).order_by(Locations.id.desc()).first()
        session.close()
        return sample

    def addSample(self, latitude, longitude, datetime):
        session = self.getSession()
        sample = Locations(latitude = latitude, longitude = longitude, datetime = datetime)
        session.add(sample)
        session.commit()
        session.close()
        return sample



