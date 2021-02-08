import React, { useEffect, useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import ClickedMarker from './Components/ClickedMarker'
import './App.css'
import mapService from './Services/locations'
import GoogleOAuth from './Components/GoogleOAuth'

function App() {

  const [newCoordinateLAT, setLAT] = useState("")
  const [newCoordinateLON, setLON] = useState("")
  const [newName, setName] = useState("")
  const [newCompany, setCompany] = useState("")
  const [newStatus, setStatus] = useState("")
  const [markers, setMarker] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [logged, setUser ] = useState(false)

  
  /* Get locations from database 
  useEffect(() => {
    mapService.getAll().then(locations => {
      setMarker(locations.data)
      console.log(locations, "moi")
    })
  },[]) */

  

  const remove = () =>  {
    console.log("not implemented")
  }
  
  /* Add location/s to the map */
  const placeMarker = () => {
    if (markers) {
      console.log(markers)
      return (
        markers.map(m => (
          <Marker
            key = {m.id}
            position={[m.Latitude, m.Longitude]}>
            <Popup>
              Added by {m.Name} {/*({m.status})*/}
              {logged ? 
                          <button onClick={() => { remove() }}>Delete</button> :
                          <p></p> 
            }
            </Popup> 
          </Marker>
        ))
      )
    }
    else return 
  }

  /* Creates a marker based on the information provided by the user  */
  const createMarker = (event) => {
    event.preventDefault()
    const marker = {
      Latitude: newCoordinateLAT,
      Longitude: newCoordinateLON,
      Name: newName,
      status: newStatus,
      id :  markers.lengtd + 1,
    }
    
    mapService.create(marker).then(response => {
      console.log(response)
    }) 
    setMarker(markers.concat(marker))
    setLAT("")
    setLON("")
    setName("")
    setCompany("")
    setStatus("")

    return (
      placeMarker() && setShowForm(!showForm) 
    )
  }
  
  /* Initialize Leaflet and add the OpenStreetMap tiles to it */ 
  const createMap = () => {
      const position = [62.24147, 25.720]
      return (
        <MapContainer center={position} zoom={12} scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {placeMarker()}
        <ClickedMarker Lat={setLAT} Lng={setLON}/>
      </MapContainer>
      )
  }

  const formToShow = showForm
  return (
    <div className="App">
      <GoogleOAuth setUser={setUser} logged={logged} />
      <h2>Map</h2>
      {createMap()}
      <h2>Add</h2>
      <button onClick={() => {setShowForm(!showForm)}}> Show</button>
      {formToShow ? (
        <form onSubmit={createMarker}>
          <fieldset>
            <table>
              <tbody>
                <tr>
                  <td>
                    <label>
                    Latitude:
                      <input type="number" value={newCoordinateLAT} onChange={(event) => { setLAT(event.target.value)}} required></input>
                    </label>
                  </td>
                  <td>
                    <label>
                    Longitude:
                      <input type="number" value={newCoordinateLON} onChange={(event) => {setLON(event.target.value)}} required></input><br/>
                    </label>
                  </td>
                </tr>
                <tr>
                  <td>
                    <label>
                      Name:
                      <input value={newName} onChange={(event) => {setName(event.target.value)}} required></input>
                    </label>
                  </td>
                  <td>
                    <label>
                  Company: <input value={newCompany} onChange={(event) => {setCompany(event.target.value)}} required></input><br/>
                    </label>
                  </td>
                </tr>
                <tr>
                  <td>
                  Bee-friend<input type="radio" name="status" value="Bee-friend" onChange={(event) => {setStatus(event.target.value)}} required></input><br/>
                  </td>
                  <td>
                  Sponsor<input type="radio" name="status" value="Sponsor" onChange={(event) => {setStatus(event.target.value)}} required></input><br/>
                  </td>
                </tr>
              </tbody>
            </table>
            <button type="submit">Add marker</button>
          </fieldset>
        </form>) : 
        (<p></p>) }
    </div>
  )
}
export default App
