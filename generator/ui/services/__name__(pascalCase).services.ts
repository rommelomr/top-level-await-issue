import axios from 'axios'
//@ts-ignore
import { useAuthStore } from '../../auth/store/useAuthStore'
//@ts-ignore
import { URL_API } from '/@src/main'

const { user } = useAuthStore()

export const __name__PascalCase__sPaginatedService = {

  getPaginated: async (
    size: number,
    page: number,
    where?: string,
    isActive?: boolean
  ) => {
    if (!user) return;
    return axios.post(
      `${URL_API}/page/__name__PascalCase__s`,
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

export const __name__PascalCase__Service = {
  add: async (data: object) => {
    if (!user) return;
    return axios.post(`${URL_API}/__name__PascalCase__s`, data, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    })
  },
  edit: async (id: string, data: object) => {
    if (!user) return;
    return axios.put(`${URL_API}/__name__PascalCase__s/${id}`, data, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    })
  },
  delete: async (id: string) => {
    if (!user) return;
    return axios.delete(`${URL_API}/__name__PascalCase__s/${id}`, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    })
  },
  getOne: async (id: string) => {
    if (!user) return;
    return axios.get(`${URL_API}/__name__PascalCase__s/${id}`, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    })
  },
  getAll: async () => {
    if (!user) return;
    return axios.get(`${URL_API}/__name__PascalCase__s`, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    })
  },
}
