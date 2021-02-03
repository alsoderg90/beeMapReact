import React, { useEffect, useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import ClickedMarker from './Components/ClickedMarker'
import './App.css'
import mapService from './Services/locations'

function App() {

  const [newCoordinateLA, setLA] = useState("")
  const [newCoordinateLO, setLO] = useState("")
  const [newName, setName] = useState("")
  const [newCompany, setCompany] = useState("")
  const [newStatus, setStatus] = useState("")
  const [markers, setMarker] = useState([])
  const [showForm, setShowForm] = useState(false)
  
  useEffect(() => {
    mapService.getAll().then(locations => {
      setMarker(locations)
      console.log(locations, "moi")
    })
  },[]) 
  

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
            </Popup> 
          </Marker>
        ))
      )
    }

    else return 
  }

  const addMarker = (event) => {
    event.preventDefault()
    const marker = {
      Latitude: newCoordinateLA,
      Longitude: newCoordinateLO,
      Name: newName,
      status: newStatus,
      id :  markers.lengtd + 1,
    }
    
    mapService.create(marker).then(response => {
      console.log(response)
      //setMarker(markers.concat(response.data))
    }) 
    setMarker(markers.concat(marker))
    setLA("")
    setLO("")
    setName("")
    setCompany("")
    setStatus("")

    return (
      placeMarker() && setShowForm(!showForm) 
    )
  }

  const initMap = () => {
      const position = [62.24147, 25.720]
      return (
        <MapContainer center={position} zoom={12} scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {placeMarker()}
        <ClickedMarker La={setLA} Lo={setLO}/>
      </MapContainer>
      )
  }

  const formToShow = showForm

  return (
    <div className="App">
      <h2>Map</h2>
      {initMap()}
      <h2>Add</h2>
      <button onClick={() => {setShowForm(!showForm)}}> Show</button>
      {formToShow ? (
        <form onSubmit={addMarker}>
          <fieldset>
            <table>
              <tbody>
                <tr>
                  <td>
                    <label>
                    Latitude:
                      <input value={newCoordinateLA} onChange={(event) => {
                        event.preventDefault()
                        setLA(event.target.value)}} required></input>
                    </label>
                  </td>
                  <td>
                    <label>
                    Longitude:
                      <input value={newCoordinateLO} onChange={(event) => {setLO(event.target.value)}} required></input><br/>
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