import type { AxiosInstance } from 'axios'
import axios from 'axios'

const baseURL = import.meta.env.VITE_APP_AUTH_URL
const jsonplaceholder = import.meta.env.VITE_APP_JSONPLACEHOLDER

axios.defaults.headers.common['Content-Type'] = 'application/json'

type AxiosInstanceType =
  | 'mainAPI'
  | 'usersAPI'

type AxiosCollection = Record<AxiosInstanceType, AxiosInstance>

const http: AxiosCollection = {
 
  usersAPI: axios.create({ baseURL: `${jsonplaceholder}` }),
  mainAPI: axios.create({ baseURL: `${baseURL}/api` }),

}
// for auth
Object.values(http).forEach((value: AxiosInstance) => {
  value.interceptors.request.use((config) => {
    const accessToken = localStorage.getItem('accessToken')
    if (accessToken)
      config.headers.Authorization = `JWT ${accessToken}`
    return config
  })

  value.interceptors.response.use(
    conf => conf,
    (error) => {
      if (error.response?.status === 401) {
        localStorage.removeItem('accessToken')
        location.reload()
      }
      return Promise.reject(error)
    },
  )
})

export default http
