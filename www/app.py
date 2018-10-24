# Imports
from flask import Flask
from flask import render_template
from database import Database
from flask import jsonify
from flask import request

import subprocess
import os

app = Flask(__name__)
db = Database()

@app.route('/')
def index():
    return render_template('index.html')

#This method return the last location in DB
@app.route('/last', methods = ["GET"])
def get_last_location():
    lastLocation = db.getLastLocation()
    return jsonify(lastLocation.serialize())

@app.route('/writesample', methods=['POST'])
def writeLocation():
    if request.method == 'POST':
        if request.form['latitude'] and request.form['longitude'] and request.form['datetime']:
            db.addSample(latitude = request.form['latitude'], longitude = request.form['longitude'], datetime = request.form['datetime'])
            return "OK "+request.form['latitude']+" "+request.form['longitude']+" "+request.form['datetime']
    else:
        return "ERROR"
        
if __name__ == "__main__":
    app.run(host='0.0.0.0', port=8888)


