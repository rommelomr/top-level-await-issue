import axios from 'axios'
import { useAuthStore } from '../../auth/store/useAuthStore'
import { User } from '../interfaces/users-interfaces'
import { URL_API } from '/@src/main'

const { user } = await useAuthStore()

export const UsersPaginatedService = {
  getPaginated: async (
    size: number,
    page: number,
    where?: string,
    isActive?: boolean
  ) => {
    return axios.post(
      `${URL_API}/page/users`,
      {
        where: where,
        isActive: isActive ? 'active' : 'inactive',
        size: size,
        page: page,
      },
      {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    )
  },
}

export const UserService = {
  add: async (data: User) => {
    return axios.post(`${URL_API}/users`, data, {
      headers: {
        Authorization: `Bearer ${user.token}`,
        'Content-Type': 'multipart/form-data',
      },
    })
  },
  edit: async (id: string, data: object) => {
    return axios.put(`${URL_API}/users/${id}`, data, {
      headers: {
        Authorization: `Bearer ${user.token}`,
        'Content-Type': 'multipart/form-data',
      },
    })
  },
  myChanel: async (data: string) => {
    return axios.put(`${URL_API}/SocketsSubscribes/${data}`, data, {
      headers: {
        Authorization: `Bearer ${user.token}`,
        'Content-Type': 'multipart/form-data',
      },
    })
  },
  delete: async (id: string) => {
    return axios.delete(`${URL_API}/users/${id}`, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    })
  },
  getOne: async (id: string) => {
    return axios.get(`${URL_API}/users/${id}`, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    })
  },
  getAll: async () => {
    return axios.get(`${URL_API}/users`, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    })
  },
}
