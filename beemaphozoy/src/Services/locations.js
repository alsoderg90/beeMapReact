import axios from 'axios'
const baseUrl = '/locations'

/* Get locations from database */
const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response)
}

/* Add location to database */
const create = (newLocation) => {
    const request = axios.post(`${baseUrl}/save`, newLocation)
    return request.then(response => response )
}

export default { getAll, create }