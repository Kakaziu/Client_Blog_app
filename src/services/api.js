import axios from 'axios'

const api = axios.create({
  baseURL: 'http://54.207.30.74:3333/'
})

export default api
