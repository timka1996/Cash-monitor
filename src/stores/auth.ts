import { acceptHMRUpdate, defineStore } from 'pinia'
import axios from 'axios'

import type { IUserInfo } from '~/types/models/user.model'

interface IState {
  user: any
  userInfo: IUserInfo
}

export const useAuthStore = defineStore('auth', {
  state: (): IState => ({
    user: {},
    userInfo: {
      id: -1,
      username: '',
      fullname: '',
      phone: '',
      organization_id: null,
      organization: '',
      office: false,
      position_id: null,
      position: '',
      last_login: '',
      prizma_status: false,
      settings: {
        scoring: false,
      },
      practice_day: {
        id: -1,
        date: '',
      },
      practice_month: {
        year: '',
        month_humanize: '',
      },
      rules: {},
    },
  }),
  getters: {
    getUserInfo: state => state.userInfo,
    getRules: state => state.userInfo.rules,
  },
  
  actions: {
    async login(user: any) {
      try {
        const { VITE_APP_AUTH_URL } = import.meta.env
        const { data } = await axios.post(
          `${VITE_APP_AUTH_URL}/auth/jwt/create/`,
          {
            username: user.username,
            password: user.password,
          },
        )
        localStorage.setItem('accessToken', data.access)
        location.reload()
        return Promise.resolve(data)
      }
      catch (error: any) {
        return Promise.reject(error)
      }
    },
    logout() {
      localStorage.removeItem('accessToken')
      location.reload()
    },
  
   
  },
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot))
