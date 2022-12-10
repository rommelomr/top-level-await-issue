<script setup lang="ts">
import { useWindowScroll } from '@vueuse/core'
import { computed, ref, watchEffect } from 'vue'
import { isLargeScreen } from '/@src/state/responsiveState'
import VueScrollTo from 'vue-scrollto'

import { isDark } from '/@src/state/darkModeState'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../../../modules/auth/store/useAuthStore'
const isMobileNavOpen = ref(false)
const router = useRouter()
const scrollTo = VueScrollTo.scrollTo
let user = useAuthStore()
const { y } = useWindowScroll()

const isScrolling = computed(() => {
  return y.value > 30
})

watchEffect(() => {
  if (isLargeScreen.value) {
    isMobileNavOpen.value = false
  }
})

const socketInit = () => {
  this.$socket.emit('emit_method', {
    hola: 'hola',
  })
}
</script>

<template>
  <nav
    class="navbar is-fixed-top is-transparent"
    :class="[!isScrolling && 'is-docked', isMobileNavOpen && 'is-solid']"
    aria-label="main navigation"
  >
    <div class="navbar-brand">
      <a href="/" class="navbar-item" @click.prevent="scrollTo('#app', 800)">
        <div class="brand-icon">
          <AnimatedLogo width="34px" height="34px" />
        </div>
      </a>

      <a
        role="button"
        :class="[isMobileNavOpen && 'is-active']"
        class="navbar-burger burger"
        aria-label="menu"
        aria-expanded="false"
        @click="isMobileNavOpen = !isMobileNavOpen"
      >
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>
    <pre>
  {{ user }}
</pre
    >
    <div class="navbar-menu" :class="[isMobileNavOpen && 'is-active']">
      <div class="navbar-start">
        <div class="navbar-item">
          <a
            href="https://themeforest.net/item/vuero-vuejs-3-admin-and-webapp-ui-kit/31053035"
            class="nav-link is-active"
          >
            Últimos cursos
          </a>
        </div>

        <div class="navbar-item">
          <RouterLink
            :to="{
              name: 'index',
              hash: '#vuero-demos',
            }"
            class="nav-link is-scroll"
            @click.passive="
              () => {
                scrollTo('#vuero-demos', 800, { offset: -50 })
                isMobileNavOpen = false
              }
            "
          >
            Próximos lanzamientos
          </RouterLink>
        </div>

        <div class="navbar-item">
          <RouterLink
            :to="{
              name: 'index',
              hash: '#vuero-components',
            }"
            class="nav-link is-scroll"
            @click.passive="
              () => {
                scrollTo('#vuero-components', 800, { offset: -50 })
                isMobileNavOpen = false
              }
            "
          >
            UI Elements
          </RouterLink>
        </div>

        <div class="navbar-item">
          <a href="https://docs.cssninja.io/vuero" class="nav-link">Docs</a>
        </div>

        <div class="navbar-item">
          <a href="https://cssninja.io" class="nav-link">Soporte Técnico</a>
        </div>
      </div>

      <div class="navbar-end">
        <div class="navbar-item is-theme-toggle">
          <label class="theme-toggle">
            <input
              id="navbar-night-toggle--daynight"
              v-model="isDark"
              type="checkbox"
            />
            <span class="toggler">
              <span class="dark">
                <i
                  aria-hidden="true"
                  class="iconify"
                  data-icon="feather:moon"
                ></i>
              </span>
              <span class="light">
                <i
                  aria-hidden="true"
                  class="iconify"
                  data-icon="feather:sun"
                ></i>
              </span>
            </span>
          </label>
        </div>
        <div class="navbar-item">
          <RouterLink :to="{ name: 'login' }" class="nav-link">
            Entrar
          </RouterLink>
        </div>
        <div class="navbar-item">
          <V-Button :to="{ name: 'signup' }" color="primary" rounded raised>
            <strong>Registrarme</strong>
          </V-Button>
        </div>
      </div>
    </div>
  </nav>
</template>
