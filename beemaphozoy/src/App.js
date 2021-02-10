import React, { useEffect, useState } from 'react'
import ClickedMarker from './Components/ClickedMarker'
import SocialFollow from './Components/SocialFollow'
import mapService from './Services/locations'
import GoogleOAuth from './Components/GoogleOAuth'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { useTranslation } from 'react-i18next'
import i18n from './i18n'
import './App.css'


function App() {

  const [newCoordinateLAT, setLAT] = useState('')
  const [newCoordinateLON, setLON] = useState('')
  const [newName, setName] = useState('')
  const [newCompany, setCompany] = useState('')
  const [newStatus, setStatus] = useState('')
  const [newEmail, setEmail] = useState('')
  const [markers, setMarker] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [logged, setUser ] = useState(false)
  const { t } = useTranslation()

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  }

  /* Get locations from database
  useEffect(() => {
    mapService.getAll().then(locations => {
      setMarker(locations.data)
      console.log(locations, "moi")
    })
  },[]) */

  const remove = () =>  {
    console.log('not implemented')
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
                <p></p> }
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
    setLAT('')
    setLON('')
    setName('')
    setCompany('')
    setStatus('')

    return (
      placeMarker() && setShowForm(!showForm)
    )
  }

  /* Initialize Leaflet and add the OpenStreetMap tiles to it */
  const createMap = () => {
    const position = [63.8147, 25.720]
    return (
      <MapContainer center={position} zoom={6} scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {placeMarker()}
        <ClickedMarker Lat={setLAT} Lng={setLON}/>
      </MapContainer>
    )
  }

  //const formToShow = showForm
  return (
    <div className="Map">
      {/* <h2>Map</h2> */}
      {createMap()}
      {/* <button onClick={() => {setShowForm(!showForm)}}> Show</button>
      {formToShow ? ( */}
      <div className="Rightside">
        <div className="Header">
          <div>
            <p><input type="radio" name="language" value="FI" onChange={(event) => {changeLanguage(event.target.value)}}></input>FI</p>
            <p><input type="radio" name="language" value="EN" onChange={(event) => {changeLanguage(event.target.value)}}></input>EN </p>
          </div>
          {/* <div>
        <image src={logo}></image>
    </div> */}
          <div>
            <GoogleOAuth setUser={setUser} logged={logged} />
          </div>
        </div>
        <form onSubmit={createMarker}>
          <fieldset>
            <legend><h2>{t('title')}</h2></legend>
            <table>
              <tbody>
                <tr>
                  <td>
                    <label>
                      {t('form.latitude')}
                      <input type="number" value={newCoordinateLAT} onChange={(event) => { setLAT(event.target.value)}} required></input>
                    </label>
                  </td>
                  <td>
                    <label>
                      {t('form.longitude')}
                      <input type="number" value={newCoordinateLON} onChange={(event) => {setLON(event.target.value)}} required></input><br/>
                    </label>
                  </td>
                </tr>
                <tr>
                  <td>
                    <label>
                      {t('form.name')}
                      <input value={newName} onChange={(event) => {setName(event.target.value)}} required></input>
                    </label>
                  </td>
                  <td>
                    <label>
                      {t('form.email')}
                      <input type="email" value={newEmail} onChange={(event) => {setEmail(event.target.value)}} required></input><br/>
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
                </tr>{/*}
                <tr>
                  <td>
                    <label>
                    Company:
                      <input value={newCompany} onChange={(event) => {setCompany(event.target.value)}} required></input><br/>
                    </label>
                  </td>
                </tr> */}
              </tbody>
            </table>
            <button type="submit">{t('form.add')}</button>
          </fieldset>
        </form> {/*}) :
        (<p></p>) } */}
        <div className="Footer">
          <SocialFollow t={t}/>
        </div>
      </div>
    </div>
  )
}
export default App
