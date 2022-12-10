import axios from 'axios'
import { URL_API } from '/@src/main'
export const loginService = {
  logIn: async (data: any) => {
    return axios.post(`${URL_API}/auth/signIn`, data)
  },
  signup: async (data: any) => {
    return axios.post(`${URL_API}/auth/signUp`, data)
  },
}
