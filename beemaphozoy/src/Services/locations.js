import axios from 'axios'
const baseUrl = 'http://127.0.0.1:5000/locations'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = (newLocation) => {
    const request = axios.post(`${baseUrl}/save`, newLocation)
    return request.then(response => response )
}

export default {getAll, create}