import axios from 'axios'
import { useAuthStore } from '../../auth/store/useAuthStore'
import { URL_API } from '/@src/main'

const user = useAuthStore()

export const NotificationsPaginatedService = {
  getPaginated: async (
    size: number,
    page: number,
    where?: string,
    isActive?: boolean
  ) => {
    return axios.post(
      `${URL_API}/page/clients`,
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

export const NotificationsService = {
  add: async (data: object) => {
    console.log(data)
    return axios.post(`${URL_API}/notifications`, data, {
      headers: {
        Authorization: `Bearer ${user.token}`,
        'Content-Type': 'multipart/form-data',
      },
    })
  },
  edit: async (id: string, data: object) => {
    return axios.put(`${URL_API}/notifications/${id}`, data, {
      headers: {
        Authorization: `Bearer ${user.token}`,
        'Content-Type': 'multipart/form-data',
      },
    })
  },
  delete: async (id: string) => {
    return axios.delete(`${URL_API}/notifications/${id}`, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    })
  },
  getOne: async (id: string) => {
    return axios.get(`${URL_API}/notifications/${id}`, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    })
  },
  getAll: async () => {
    return axios.get(`${URL_API}/notifications`, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    })
  },
}
