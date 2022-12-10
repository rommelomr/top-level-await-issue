export interface __name__PascalCase__ {
  id?: string
  name: string
  description?: string
  isActive: boolean
}

export interface __name__PascalCase__Table {
  total: number
  currentPage: number
  totalPage: number
  items: Array<__name__PascalCase__>
  elementsForPage: number
  isActive: boolean
  where: string
}
