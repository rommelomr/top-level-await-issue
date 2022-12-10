<template>
  <center>
    <VFlex
      v-if="formState.avatarFile == undefined || store.modalMode == 'create'"
      flex-wrap="wrap"
      align-items="flex-end"
      row-gap=".5rem"
      column-gap=".25rem"
    >
      <VControl>
        <VFilePond
          class="profile-filepond"
          name="profile_filepond"
          :chunk-retry-delays="[500, 1000, 3000]"
          label-idle="<i class='lnil lnil-cloud-upload'></i>"
          :accepted-file-types="['image/png', 'image/jpeg', 'image/gif']"
          :image-preview-height="140"
          :image-resize-target-width="140"
          :image-resize-target-height="140"
          image-crop-aspect-ratio="1:1"
          style-panel-layout="compact circle"
          style-load-indicator-position="center bottom"
          style-progress-indicator-position="right bottom"
          style-button-remove-item-position="left bottom"
          style-button-process-item-position="right bottom"
          @addfile="onAddFile"
          @removefile="onRemoveFile"
        />
      </VControl>
      <label class="dark-inverted">Click para seleccionar tu avatar</label>
    </VFlex>
    <VFlex
      v-else
      flex-wrap="wrap"
      align-items="flex-end"
      row-gap=".5rem"
      column-gap=".25rem"
    >
      <div><V-Avatar :picture="store.selectedItem.avatarFile" size="xl" /></div>

      <div>
        <button
          v-if="store.modalMode == 'edit'"
          class="button is-text mt-2"
          @click="cleanImage"
        >
          Elegir otra imagen
        </button>
      </div>
    </VFlex>
  </center>
  <div class="control has-validation mt-4">
    <div class="columns">
      <div class="column is-half">
        <V-Field>
          <V-Control>
            <p class="help dark-inverted">Nombre</p>
            <input
              id="firstName"
              v-model="v$.firstName.$model"
              :disabled="store.modalMode == 'see'"
              type="text"
              class="input"
              placeholder="Nombre"
            />
          </V-Control>
        </V-Field>
      </div>

      <div class="column">
        <V-Field>
          <V-Control>
            <p class="help dark-inverted">Apellido</p>
            <input
              id="lastName"
              v-model="v$.lastName.$model"
              :disabled="store.modalMode == 'see'"
              type="text"
              class="input"
              placeholder="Apellido"
            />
          </V-Control>
        </V-Field>
      </div>
    </div>
    <div class="columns">
      <div class="column">
        <V-Field>
          <V-Control>
            <p class="help dark-inverted">Contraseña</p>
            <input
              id="password"
              v-model="v$.password.$model"
              :disabled="store.modalMode == 'see'"
              type="password"
              class="input"
              placeholder="Contraseña"
            />
          </V-Control>
        </V-Field>
      </div>
      <div class="column is-half">
        <V-Field>
          <V-Control>
            <p class="help dark-inverted">Username</p>
            <input
              id="username"
              v-model="v$.username.$model"
              :disabled="store.modalMode == 'see'"
              type="text"
              class="input"
              placeholder="Username"
            />
          </V-Control>
        </V-Field>
      </div>
    </div>
    <div class="columns">
      <div class="column">
        <V-Control>
          <label class="help dark-inverted">Género</label>
          <span class="select">
            <select
              v-model="v$.gender.$model"
              :disabled="store.modalMode == 'see'"
            >
              <option value="MALE">Hombre</option>
              <option value="FEMALE">Mujer</option>
              <option value="OTHER">Otro</option>
            </select>
          </span>
        </V-Control>
      </div>
      <div class="column">
        <V-Control>
          <label class="help dark-inverted">Tipo de usuario</label>
          <span class="select">
            <select
              v-model="v$.typeUser.$model"
              :disabled="store.modalMode == 'see'"
            >
              <option value="SUPER_ADMIN">Super administrador</option>
              <option value="ADMIN">Administrador</option>
              <option value="MENTOR">Mentor</option>
              <option value="INSTRUCTOR">Instructor</option>
              <option value="ACADEMIC_COORDINATOR">
                Coordinador académico
              </option>
            </select>
          </span>
        </V-Control>
      </div>
    </div>

    <div class="columns">
      <div class="column">
        <V-Field>
          <V-Control>
            <p class="help dark-inverted">Email</p>
            <input
              id="email"
              v-model="v$.email.$model"
              :disabled="store.modalMode != 'create'"
              type="text"
              class="input"
              placeholder="Email"
            />
          </V-Control>
        </V-Field>
      </div>
      <div class="column">
        <V-Control>
          <label class="help dark-inverted">Estado</label>
          <span class="select">
            <select v-model="isActive" :disabled="store.modalMode == 'see'">
              <option value="true">Activo</option>
              <option value="false">Inactivo</option>
            </select>
          </span>
        </V-Control>
      </div>
    </div>
  </div>
  <br />
  <div class="r">
    <center>
      <V-Button
        v-if="!isLoading"
        class="mx-6"
        color="danger"
        icon="feather:x"
        raised
        rounded
        @click="store.handelCloseModal()"
      >
        Cancelar
      </V-Button>
      <V-Button
        v-if="!isLoading && store.modalMode != 'see'"
        class="mx-6"
        type="submit"
        color="success"
        icon="feather:save"
        raised
        rounded
        @click="handleSubmit"
      >
        Guardar
      </V-Button>
    </center>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import useNotyf from '/@src/composable/useNotyf'

import { reactive, computed } from 'vue'
import { required, email } from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core'
import { User } from '../../interfaces/users-interfaces'
import { useUserStore } from '../../store/User.store'
import { UserService } from '../../services/User.services'
import { forms } from '/@src/data/landing/components'

const store = useUserStore()
const isLoading = ref(false)
const notif = useNotyf()

const cleanImage = () => {
  formState.avatarFile = undefined
}

const isActive = ref(true)
const random_number = Math.floor(Math.random() * 256)
let formState: User = reactive({
  id: undefined,
  username: import.meta.env.DEV ? 'testuser ' + random_number : '',
  password: import.meta.env.DEV ? 'testuser ' + random_number : '123..',
  firstName: import.meta.env.DEV ? 'Test ' + random_number : '',
  lastName: import.meta.env.DEV ? 'User ' + random_number : '',
  email: import.meta.env.DEV ? 'testuser ' + random_number + '@gmail.com' : '',
  course: 'TEN',
  gender: 'MALE',
  typeUser: 'SUPER_ADMIN',
  //profile: {},
  //roles: {},
  avatarFile: undefined,
  isActive: true,
})

let rules = computed(() => {
  return {
    username: {
      required,
    },
    firstName: {
      required,
    },
    lastName: {
      required,
    },
    email: {
      required,
    },
    password: {
      required,
    },
    course: {},
    typeUser: {},

    gender: {
      required,
    },
    profile: {},
    roles: {},
  }
})

let v$ = useVuelidate(rules, formState, {
  $autoDirty: true,
})

const handleSubmit = async () => {
  let auxFormState = { ...formState }
  auxFormState.avatarFile = avatarFile
  await v$.value.$validate()

  if (v$.value.$invalid) {
    notif.error('Error de validación')
    return
  } else {
    if (store.modalMode == 'edit') {
      edit(formState.id, auxFormState)
    } else {
      add(formState)
    }
  }
}

const edit = async (id, fs) => {
  console.log(fs)
  isLoading.value = true
  let data = new FormData()
  for (let i in fs) {
    if (i == 'id') {
      continue
    }

    if (i == 'avatarFile') {
      if (fs[i] != undefined) data.append(i, fs[i].file)
    } else {
      data.append(i, fs[i])
    }
  }

  console.log(data.get('avatarFile'))

  const response = await UserService.edit(id, data)

  if (response.data.status === 200) {
    notif.success('Editado con éxito')
    await store.handelIsLoading('reload')
    await store.handelCloseModal()
    await reset()
    isLoading.value = false
  } else {
    isLoading.value = false
    notif.error(response.data.message)
  }
}
const add = async () => {
  let data = new FormData()
  for (let i in formState) {
    if (i == 'id') {
      continue
    }

    if (i == 'avatarFile') {
      if (formState[i] != undefined) data.append(i, formState[i].file)
    } else {
      data.append(i, formState[i])
    }
  }

  console.log(data.get('avatarFile'))
  const response = await UserService.add(data)
  if (response.data.status === 200) {
    await store.handelIsLoading('reload')
    await store.handelCloseModal()
    await reset()
    notif.success('Agregado con éxito')
  } else {
    isLoading.value = false
    notif.error(response.data.message)
  }
}

const reset = () => {
  formState.id = undefined
  formState.username = ''
  formState.password = ''
  formState.firstName = ''
  formState.lastName = ''
  formState.email = ''
  formState.course = 'TEN'
  formState.gender = 'MALE'
  formState.typeUser = 'SUPER_ADMIN'
  //formState.profile = {}
  //formState.roles = {}
  formState.avatarFile = undefined
  formState.isActive = true
}

const setItem = () => {
  //console.log(selectedItem)
  formState.id = store.selectedItem.id
  formState.username = store.selectedItem.username
  formState.firstName = store.selectedItem.firstName
  formState.lastName = store.selectedItem.lastName
  formState.email = store.selectedItem.email
  formState.course = store.selectedItem.course
  formState.gender = store.selectedItem.gender
  formState.typeUser = store.selectedItem.typeUser
  //formState.profile = store.selectedItem.profile
  //formState.roles = store.selectedItem.roles
  formState.avatarFile = store.selectedItem.avatarFile
  formState.isActive = store.selectedItem.isActive
}

let avatarFile = reactive({})
const onAddFile = (error: any, fileInfo: any) => {
  if (!error) {
    if (store.modalMode == 'create') {
      formState.avatarFile = fileInfo
    } else {
      avatarFile = fileInfo
    }
  }
}

const setRulesUpdate = () => {
  rules.value.password = {}
  v$ = useVuelidate(rules, formState, {
    $autoDirty: true,
  })
}

watch(() => {
  if (store.modalMode == 'edit') {
    setRulesUpdate()
    setItem()
  } else {
    console.log(store.selectedItem)
    reset()
  }
})

watch(isActive, () => {
  console.log(isActive.value)
  if (isActive.value === 'true') {
    formState.isActive = true
  } else {
    formState.isActive = false
  }
})
</script>

<style lang="scss" scoped>
@import '../../../../../src/scss/abstracts/_variables.scss';
@import '../../../../../src/scss/abstracts/_mixins.scss';

.leftButton {
  margin-left: auto !important;
  min-width: 140px;
}
</style>
