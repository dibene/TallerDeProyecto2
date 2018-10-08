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

#This method return the last sample in DB
@app.route('/last', methods = ["GET"])
def get_last_sample():
    lastSample = db.getLastSample()
    return jsonify(lastSample.serialize())

@app.route('/writesample', methods=['POST'])
def writeSample():
    if request.method == 'POST':
        latitude=request.form['latitude']
        longitude=request.form['longitude']
        datetime=request.form['datetime']
        #db.addSample(latitude,longitude,datetime)
        return "OK"
    else:
        return "ERROR"
        

    
""" 
#This method return the average of the 10 lastest samples
@app.route('/average', methods = ["GET"])
def get_average():
    average = db.getAverageSamples()
    return jsonify(average)
 """
if __name__ == "__main__":
    app.run(host='0.0.0.0', port=8888)

