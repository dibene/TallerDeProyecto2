from flask import Flask
from flask import render_template
from database import Database
from flask import jsonify
from flask import request

import subprocess
import os
import time

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
        if isValidForm(request):
            try:
                correctDateTimeFormatted = isCorrectDatetimeWithReturn(request.form['datetime'])
                if(correctDateTimeFormatted != "Error datetime"):
                    db.addSample(latitude = request.form['latitude'], longitude = request.form['longitude'], datetime = correctDateTimeFormatted)
                    return "OK "+request.form['latitude']+" "+request.form['longitude']+" "+request.form['datetime']
                else:
                    return "Error in Datetime, must be YYYY-MM-DD HH:mm:ss"
            except ValueError:
                print("Incorrect date!")
    else:
        return "ERROR"

def isValidForm(request):
    return request.form['latitude'] and request.form['longitude'] and request.form['datetime']

def isCorrectDatetimeWithReturn(datetimeToValidate):
    timeformat = "%Y-%m-%d %H:%M:%S"
    try:
        time.strptime(datetimeToValidate, timeformat)
        return datetimeToValidate
    except ValueError:
        return "Error datetime"

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=8888)


