import { defineStore } from 'pinia'
//import { NotificationsService } from '../services/Notifications.services'

export const useNotificationsStore = defineStore({
  id: 'notifications-store',
  state: () => ({
    notifications: [],
  }),

  actions: {
    setNotifications(notif: any) {
      this.notifications = notif

    }
  },
})
