<script setup lang="ts">
import type { PropType } from 'vue'

type User = {
  avatarFile: string
  badge: string
  firstName: string
  lastName: string
  username: string
  email: string
}

const props = defineProps({
  user: {
    type: Object as PropType<User>,
    default: undefined,
  },
})
</script>

<template>
  <div class="v-popover-profile has-loader">
    <div class="profile-popover-block">
      <div class="profile-popover-wrapper">
        <div v-if="user.avatarFile" class="popover-avatar">
          <img class="avatar" :src="user.avatarFile" alt="" />
          <img v-if="user.badge" class="badge" :src="user.badge" alt="" />
        </div>
        <div
          v-else
          class="popover-fake-avatar"
          :class="[user.color && `is-${user.color}`]"
        >
          <div class="fake-avatar">
            <span>{{ user.initials }}</span>
          </div>
          <img v-if="user.badge" class="badge" :src="user.badge" alt="" />
        </div>
        <div class="popover-meta">
          <span class="user-meta">
            <span class="username">{{
              user.firstName + ' ' + user.lastName
            }}</span>
          </span>
          <span class="job-title mb-1">{{ user.email }}</span>
          <span class="bio">{{ user.bio }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
