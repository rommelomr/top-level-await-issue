<script setup lang="ts">
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useHead } from '@vueuse/head'

import { isDark } from '/@src/state/darkModeState'
import useUserSession from '/@src/composable/useUserSession'
import useNotyf from '/@src/composable/useNotyf'
import sleep from '/@src/utils/sleep'
import { reactive, computed } from 'vue'

import { required, email } from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core'
import { useCounterStore } from '../store/counter.state'

const isLoading = ref(false)
const router = useRouter()
const route = useRoute()
const notif = useNotyf()
const userSession = useUserSession()
const redirect = route.query.redirect as string

const formState = reactive({
  email: '',
  password: '',
})

const rules = computed(() => {
  return {
    email: {
      required,
      email,
    },
    password: {
      required,
    },
  }
})

const v$ = useVuelidate(rules, formState, { $autoDirty: true })

const handleSubmit = async () => {
  // Do I need this? Without it, my custom select doesn't seem to trigger
  // $touched or $dirty or something and doesn't show its errors on submit
  await v$.value.$validate()

  // This doesn't work if I don't have the ".value" either
  if (v$.value.$invalid) {
    notif.error('Errror de validación')
    return
  } else {
    notif.success('Welcome!!!')
    return
  }
}

const handleLogin = async () => {
  if (!isLoading.value) {
    isLoading.value = true

    await sleep(2000)
    userSession.token = 'logged-in'
    notif.success('Welcome back, Erik Kovalsky')

    if (redirect) {
      router.push(redirect)
    } else {
      router.push({
        name: 'app',
      })
    }

    isLoading.value = false
  }
}

useHead({
  title: 'Display- login',
})
</script>

<template>
  <div class="auth-wrapper-inner columns is-gapless">
    <!-- Image section (hidden on mobile) -->
    <div
      class="
        column
        login-column
        is-8
        h-hidden-mobile h-hidden-tablet-p
        hero-banner
      "
    >
      <div class="hero login-hero is-fullheight is-app-grey">
        <div class="hero-body">
          <div class="columns">
            <div class="column is-10 is-offset-1">
              <img
                class="light-image has-light-shadow has-light-border"
                src="/@src/assets/illustrations/apps/vuero-banking-light.png?format=webp"
                alt=""
              />
              <img
                class="dark-image has-light-shadow"
                src="/@src/assets/illustrations/apps/vuero-banking-dark.png?format=webp"
                alt=""
              />
            </div>
          </div>
        </div>
        <div class="hero-footer">
          <p class="has-text-centered"></p>
        </div>
      </div>
    </div>

    <!-- Form section -->
    <div class="column is-4">
      <div class="hero is-fullheight is-white">
        <div class="hero-heading">
          <label class="dark-mode ml-auto">
            <input
              type="checkbox"
              :checked="!isDark"
              @change="
                (event) => {
                  isDark = !event.target.checked
                }
              "
            />
            <span></span>
          </label>
          <div class="auth-logo">
            <RouterLink :to="{ name: 'index' }">
              <AnimatedLogo width="36px" height="36px" />
            </RouterLink>
          </div>
        </div>
        <div class="hero-body">
          <div class="container">
            <div class="columns">
              <div class="column is-12">
                <div class="auth-content" style="border: 0px">
                  <img class="" src="/@src/assets/svg/logoDisplay.svg" alt="" />
                </div>
                <div class="auth-form-wrapper">
                  <!-- Login Form -->
                  <form @submit.prevent="handleSubmit">
                    <div class="login-form">
                      <!-- Username -->
                      <V-Field>
                        <V-Control icon="feather:user">
                          <input
                            id="name"
                            v-model="v$.email.$model"
                            name="name"
                            class="input"
                            type="text"
                            placeholder="Email"
                            autocomplete="username"
                          />
                          <div v-if="v$.email.$error">
                            <span
                              v-for="(error, index) of v$.email.$errors"
                              id="name-error"
                              :key="index"
                            >
                              Debe ser un email
                            </span>
                          </div>
                        </V-Control>
                      </V-Field>

                      <!-- Password -->
                      <V-Field>
                        <V-Control icon="feather:lock">
                          <input
                            v-model="v$.password.$model"
                            class="input"
                            type="password"
                            placeholder="Password"
                            autocomplete="current-password"
                          />
                          <div v-if="v$.password.$error">
                            <span
                              v-for="(error, index) of v$.password.$errors"
                              id="name-error"
                              :key="index"
                            >
                              Campo requerido
                            </span>
                          </div>
                        </V-Control>
                      </V-Field>

                      <!-- Switch -->
                      <V-Control class="setting-item">
                        <label for="remember-me" class="form-switch is-primary">
                          <input
                            id="remember-me"
                            type="checkbox"
                            class="is-switch"
                          />
                          <i aria-hidden="true"></i>
                        </label>
                        <div class="setting-meta">
                          <label for="remember-me">
                            <span>Remember Me</span>
                          </label>
                        </div>
                      </V-Control>

                      <!-- Submit -->
                      <V-Control class="login">
                        <V-Button
                          :loading="isLoading"
                          color="primary"
                          type="submit"
                          bold
                          fullwidth
                          raised
                        >
                          Sign In
                        </V-Button>
                      </V-Control>

                      <div class="forgot-link has-text-centered">
                        <a>Forgot Password?</a>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
