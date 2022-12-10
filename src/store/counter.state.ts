import { defineStore } from 'pinia'

export const useCounterStore = defineStore({
  id: 'countStore',
  state: () => ({ count: 0 }),
  getters: {
    lastOperation: (state) => state.count,
  },
  actions: {
    add() {
      this.count++
    },
    remove() {
      this.count--
    },
    random() {
      this.count = Math.floor(Math.random() * 101)
    },
  },
})
