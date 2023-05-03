import axios from 'axios'

const api = axios.create({
  baseURL: 'https://server-blog-app-oizk-2ho1c32nz-kakaziu.vercel.app/'
})

export default api
