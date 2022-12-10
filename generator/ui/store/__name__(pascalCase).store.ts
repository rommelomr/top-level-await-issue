import { defineStore } from 'pinia'
import { __name__PascalCase__ } from '../interfaces/__name__(kebabCase)-interfaces'

export const use__name__PascalCase__Store = defineStore({
  id: '__name__(kebabCase)-store',
  state: () => ({
    modal: '',
    modalMode: '',
    isLoading: '',
    selectedItem: {},
    selectedItemIndex: -1,
  }),

  actions: {
    openCreateItemModal() {
      this.setModal('__name__(kebabCase)-form')
      this.setModalMode('create')
    },
    openSeeItemModal(item: object) {
      this.setSelectedItem(item)
      this.setModal('__name__(kebabCase)-form')
      this.setModalMode('see')
    },
    openEditItemModal(item: object) {
      this.setSelectedItem(item)
      this.setModal('__name__(kebabCase)-form')
      this.setModalMode('edit')
    },
    closeModal() {
      this.setSelectedItem({})
      this.setModal('')
      this.setModalMode('')
    },
    setModal(m: string) {
      this.modal = m
    },
    setModalMode(mm: string) {
      this.modalMode = mm
    },
    setSelectedItem(item: object) {
      this.selectedItem = item
    },
    setSelectedItemIndex(key: number) {
      this.selectedItemIndex = key
    },
    //core methods
    handelOpenModal(type: string) {
      this.modal = type
    },
    handelCloseModal() {
      this.modal = ''
      this.selectedItem = {}
    },
    setItemToEdit(item: __name__PascalCase__) {
      this.selectedItem = item
      this.modal = 'form'
    },
    setItemToSee(item: __name__PascalCase__) {
      this.selectedItem = item
      this.modal = 'detail'
    },
    handelIsLoading(mode: string) {
      this.isLoading = mode
    },
    unsetItem() {
      this.selectedItem = {}
    },
  },
})
