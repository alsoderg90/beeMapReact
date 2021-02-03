from flask import Flask, render_template
import os
from google.cloud import datastore

app = Flask(__name__)

datastore_client = datastore.Client('beemaphozoy')

@app.route('/')
def home():

   
    locations = []
    for latlng in datastore_client.query(kind='HiveLocation').fetch():
        locations.append({
            "lat": latlng['LatLng'].latitude,
            "lon": latlng['LatLng'].longitude
        })
    return locations
    #return render_template('mymap.html', hive_locations=locations)

if __name__ == '__main__':
    host = os.getenv("HOST", "127.0.0.1")
    port = os.getenv("PORT", "5000")

    app.run(host=host, port=port)
