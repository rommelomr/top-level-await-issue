import { defineStore } from 'pinia'
import { User } from '../interfaces/users-interfaces'

export const useUserStore = defineStore({
  id: 'user-store',
  state: () => ({
    modal: '',
    modalMode: '',
    isLoading: '',
    selectedItem: {},
  }),

  actions: {
    handelOpenModal(type: string, modalMode: string) {
      this.modal = type
      this.modalMode = modalMode
    },
    handelCloseModal() {
      this.modal = ''
      this.modalMode = ''
      this.selectedItem = {}
    },
    setItemToEdit(item: User) {
      this.selectedItem = item
      this.modalMode = 'edit'
      this.modal = 'form'
    },

    setItem(item: User) {
      this.selectedItem = item
    },

    setItemToSee(item: User) {
      this.selectedItem = item
      this.modal = 'form'
      this.modalMode = 'see'
    },
    handelIsLoading(mode: string) {
      this.isLoading = mode
    },
    unsetItem() {
      this.selectedItem = {}
      this.modalMode = ''
    },
  },
})
