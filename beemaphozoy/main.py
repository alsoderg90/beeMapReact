from flask import Flask, request
import os
import simplejson as json
from google.cloud import datastore

app = Flask(__name__)

datastore_client = datastore.Client('beemaphozoy')

@app.route('/locations')
def locations():
    query = datastore_client.query(kind='HiveLocation')
    results = list(query.fetch())
    #print(results[0]["LatLng"].latitude, results[0]["LatLng"].longitude, results[0]["Name"])
    locations = []
    for item in results:
        locations.append(
            {"Latitude": item["LatLng"].latitude,
             "Longitude": item["LatLng"].longitude,
             "Name": item["Name"]})
    #print(json.dumps(locations), "locations")
    return json.dumps(locations)

@app.route('/locations/save', methods=["POST"])
def save_to_db():
    data = request.get_json()
    print("saved", data,"!")
    #print(data["Latitude"], data["Longitude"])
    kind = "HiveLocation"
    task_key = datastore_client.key(kind)
    task = datastore.Entity(key=task_key)
    #print(task_key)
    #print(task)
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
