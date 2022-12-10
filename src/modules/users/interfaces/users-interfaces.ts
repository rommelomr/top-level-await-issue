export interface User {
  id: string
  username: string
  password: string
  email: string
  firstName: string
  lastName: string
  course: string
  gender: string
  highSchool: string
  profile: any
  avatarFile: string
  typeUser: string
  roles: any
}

export interface UserTable {
  total: number
  currentPage: number
  totalPage: number
  items: Array<User>
  elementsForPage: number
  isActive: boolean
  where: string
}
