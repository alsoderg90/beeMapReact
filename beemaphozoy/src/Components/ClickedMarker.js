import { useMapEvents } from 'react-leaflet'

/* Setting coordinates from clicked positon to component state  */
function ClickedMarker({ Lat, Lng }) {

  const map = useMapEvents({
    click(e) {
      const newMarker = e.latlng
      console.log(newMarker)
      Lat(newMarker.lat)
      Lng(newMarker.lng)
    }
  })
  return null

}

export default ClickedMarker