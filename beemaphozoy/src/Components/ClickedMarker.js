import { useMapEvents } from 'react-leaflet'

function ClickedMarker({ La, Lo }) {

  const map = useMapEvents({
    click(e) {
      const newMarker = e.latlng
      console.log(newMarker)
      La(newMarker.lat)
      Lo(newMarker.lng)
    }
  })
  return null

}

export default ClickedMarker