from flask import Flask, request
import os
import simplejson as json
from google.cloud import datastore

app = Flask(__name__)

datastore_client = datastore.Client('beemaphozoy')

@app.route('/locations')
def locations():
    kind = "HiveLocation"
    query = datastore_client.query(kind=kind)
    results = list(query.fetch())
    locations = []
    for item in results:
        locations.append(
            {"Latitude": item["LatLng"].latitude,
             "Longitude": item["LatLng"].longitude,
             "Name": item["Name"]})
    return json.dumps(locations)

@app.route('/locations/save', methods=["POST"])
def save_to_db():
    data = request.get_json()
    print("saved", data,"!")
    kind = "HiveLocation"
    task_key = datastore_client.key(kind)
    task = datastore.Entity(key=task_key)
    geopoint = datastore.helpers.GeoPoint(data["Latitude"], data["Longitude"])
    task["LatLng"] = geopoint
    task["Name"] = data["Name"]
    print(geopoint, task)
    datastore_client.put(task)
    res = {"Latitude": task["LatLng"].latitude,
           "Longitude": task["LatLng"].longitude,
           "Name": task["Name"] }
    return res
    
if __name__ == '__main__':
     host = os.getenv("HOST", "127.0.0.1")
     port = os.getenv("PORT", "5000")

     app.run(host=host, port=port)
