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
   # cmd = "python3 process.py"
   # subprocess.Popen(cmd.split(), preexec_fn=os.setsid)
    return render_template('index.html')

#This method return the last location in DB
@app.route('/last', methods = ["GET"])
def get_last_location():
    lastLocation = db.getLastLocation()
    return jsonify(lastLocation.serialize())

@app.route('/writelocation', methods=['POST'])
def writeLocation():
    if request.method == 'POST':
        latitude = request.form['latitude']
        longitude = request.form['longitude']
        datetime = request.form['datetime']
        #db.addLocation(latitude,longitude,datetime)
        return "OK"
    else:
        return "ERROR"
        
if __name__ == "__main__":
    app.run(host='0.0.0.0', port=8888)

