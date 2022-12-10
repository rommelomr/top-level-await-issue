
<script setup lang="ts">
import { useStorage } from '@vueuse/core'
import { watch, inject, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '/@src/modules/auth/store/useAuthStore'
import { ShoppingCartState } from '../../../state/ShoppingCartState'
const user = useAuthStore().user
const authActions = useAuthStore()
const router = useRouter()
const goTo = (route) => {
  window.location.assign(route)
}
const displayShoppingCart = () => {
  ShoppingCartState.value.visibility = 'displayed'
}
</script>

<template>
  <V-Dropdown right spaced class="user-dropdown profile-dropdown">
    <template #button="{ toggle }">
      <a
        class="is-trigger dropdown-trigger"
        aria-haspopup="true"
        @click="toggle"
      >
        <V-Avatar
          v-if="user.avatarFile == null"
          :initials="$filters.initials(user.firstName)"
          color="primary"
        />
        <V-Avatar v-else :picture="user.avatarFile" color="primary" />
      </a>
    </template>

    <template #content>
      <div class="dropdown-head">
        <V-Avatar
          v-if="user.avatarFile == null"
          :initials="$filters.initials(user.firstName)"
          color="primary"
        />
        <V-Avatar v-else :picture="user.avatarFile" color="primary" />

        <div class="meta">
          <span>
            {{ $filters.toCapitalize(user.firstName) }}
            {{ $filters.toCapitalize(user.lastName) }}</span
          >
          <span>{{ user.email }}</span>
        </div>
      </div>

      <!--a href="#" role="menuitem" class="dropdown-item is-media">
        <div class="icon">
          <i aria-hidden="true" class="lnil lnil-user-alt"></i>
        </div>
        <div class="meta">
          <span>Profile</span>
          <span>View your profile</span>
        </div>
      </a>

      <hr class="dropdown-divider" />

      <a href="#" role="menuitem" class="dropdown-item is-media">
        <div class="icon">
          <i aria-hidden="true" class="lnil lnil-briefcase"></i>
        </div>
        <div class="meta">
          <span>Projects</span>
          <span>All my projects</span>
        </div>
      </a>

      <a href="#" role="menuitem" class="dropdown-item is-media">
        <div class="icon">
          <i aria-hidden="true" class="lnil lnil-users-alt"></i>
        </div>
        <div class="meta">
          <span>Team</span>
          <span>Manage your team</span>
        </div>
      </a>

      <hr class="dropdown-divider" />

      <a href="#" role="menuitem" class="dropdown-item is-media">
        <div class="icon">
          <i aria-hidden="true" class="lnil lnil-cog"></i>
        </div>
        <div class="meta">
          <span>Settings</span>
          <span>Account settings</span>
        </div>
      </a-->
      <a
        href="#"
        @click="goTo('/student/dashboard')"
        role="menuitem"
        class="dropdown-item is-media"
      >
        <div class="icon">
          <i aria-hidden="true" class="lnil lnil-control-panel"></i>
        </div>
        <div class="meta">
          <span>Dashboard</span>
        </div>
      </a>
      <a
        href="#"
        @click="displayShoppingCart"
        role="menuitem"
        class="dropdown-item is-media"
      >
        <div class="icon">
          <i class="iconify" data-icon="feather:shopping-cart"></i>
        </div>
        <div class="meta">
          <span>Carrito de compra</span>
        </div>
      </a>

      <hr class="dropdown-divider" />

      <div class="dropdown-item is-button">
        <V-Button
          class="logout-button"
          icon="feather:log-out"
          color="primary"
          role="menuitem"
          raised
          fullwidth
          @click="authActions.logout()"
        >
          Salir
        </V-Button>
      </div>
    </template>
  </V-Dropdown>
</template>

