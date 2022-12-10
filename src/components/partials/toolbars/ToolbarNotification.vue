<script setup lang="ts">
import useDropdown from '/@src/composable/useDropdown'
import { onMounted, ref } from 'vue'
import { mySocket } from '/@src/main'
import Push from 'push.js'
import { UserService } from '/@src/modules/users/services/User.services'
import { NotificationsService } from '/@src/modules/notifications/services/Notifications.services'

const dropdownElement = ref<HTMLElement | null>(null)
const dropdown = useDropdown(dropdownElement)
const fetch = () => {
  const store = useNotificationsStore()
  const response = NotificationsService.getAll().then((response) => {
    //@ts-ignore
    store.setNotifications(response.data)
  })
}
const subscribeNotifications = () => {
  fetch()
  if (mySocket) {
    UserService.myChanel(mySocket.id)
  }
}

mySocket.on('ping', (count) => {
  fetch()
  Push.create(count.message)
})
onMounted(() => {
  subscribeNotifications()
})
</script>

<template>
  <div class="toolbar-notifications is-hidden-mobile">
    <div
      ref="dropdownElement"
      class="dropdown is-spaced is-dots is-right dropdown-trigger"
    >
      <div class="is-trigger" aria-haspopup="true" @click="dropdown.toggle">
        <i aria-hidden="true" class="iconify" data-icon="feather:bell"></i>
        <span class="new-indicator pulsate"></span>
      </div>
      <div class="dropdown-menu" role="menu">
        <div class="dropdown-content">
          <div class="heading">
            <div class="heading-left">
              <h6 class="heading-title">Notifications</h6>
            </div>
            <div class="heading-right">
              <RouterLink
                class="notification-link"
                :to="{ name: 'sidebar-layouts-profile-notifications' }"
              >
                See all
              </RouterLink>
            </div>
          </div>
          <ul class="notification-list">
            <li v-for="item in store.notifications" :key="item.id">
              <a class="notification-item">
                <div class="img-left">
                  <img
                    class="user-photo"
                    alt=""
                    src="/demo/avatars/7.jpg"
                    @error.once="
                      $event.target.src = 'https://via.placeholder.com/150x150'
                    "
                  />
                </div>
                <div class="user-content">
                  <p class="time">{{ item.message }}</p>
                  <p class="time">1 hour ago</p>
                </div>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
