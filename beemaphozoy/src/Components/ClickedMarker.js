import { useMapEvents } from 'react-leaflet'

/* Setting coordinates from clicked positon to component state  */
function ClickedMarker({ Lat, Lng }) {
  const map = useMapEvents({
    click(e) {
      Lat(e.latlng.lat)
      Lng(e.latlng.lng)
    }
  })
  return null

}

export default ClickedMarker