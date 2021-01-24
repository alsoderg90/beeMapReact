import axios from 'axios'
const baseUrl = 'http://localhost:3001/data'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = (marker) => {
  const request = axios.post(baseUrl, marker)
  return request.then(response => response.data)

}

const remove = () => {
  console.log('moi')
}





export default { getAll, create, remove }