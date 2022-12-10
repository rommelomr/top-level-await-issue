<script setup lang="ts">
import { onMounted, ref } from 'vue'
import useNotyf from '/@src/composable/useNotyf'
import ValidationFormMessages from '/@src/modules/components/validations/ValidationFormMessages.vue'
import { reactive, computed } from 'vue'
import { required, email } from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core'
import { __name__PascalCase__ } from '../../interfaces/__name__(kebabCase)-interfaces'
import { use__name__PascalCase__Store } from '../../store/__name__PascalCase__.store'
import { __name__PascalCase__Service } from '../../services/__name__PascalCase__.services'

let errors = reactive({})
const setErrors = (err) => {
  err.map((x) => {
    errors[x.$property] = x.$validator
  })
  console.log(errors)
}

const store = use__name__PascalCase__Store()
const isLoading = ref(false)
const notif = useNotyf()
const formState: __name__PascalCase__ = reactive({
  name: '',
  description: '',
  isActive: true,
})

const rules = computed(() => {
  return {
    name: {
      required,
    },
    description: {},
  }
})

const handleSubmit = async () => {
  let v$ = useVuelidate(rules, formState, { $autoDirty: true })
  await v$.value.$validate()
  if (v$.value.$invalid) {
    setErrors(v$.value.$errors)
    notif.error('Error de validación')
    return
  } else {
    if (store.modalMode === 'edit') {
      edit()
    } else {
      add()
    }
  }
}

const edit = async () => {
  isLoading.value = true
  try {
    const response = await __name__PascalCase__Service.edit(
      store.selectedItem.id,
      formState
    )
    if (response.status === 200) {
      notif.success('Editado con éxito')
      await store.handelIsLoading('reload')
      await store.handelCloseModal()
      await reset()
    }
  } catch (e) {
    console.log(e)
    notif.error('No se ha podido hacer la actualización')
  }
  isLoading.value = false
}
const add = async () => {
  try {
    const response = await __name__PascalCase__Service.add(formState)
    if (response.status === 200) {
      await store.handelIsLoading('reload')
      await store.handelCloseModal()
      await reset()
      notif.success('Agregado con éxito')
    }
  } catch (e) {
    console.log(e)
    isLoading.value = false

    notif.error('No se ha podido agregar')
  }
}

const reset = () => {
  formState.id = undefined
  formState.name = ''
  formState.description = ''
  formState.isActive = true
}

const setItem = () => {
  formState.name = store.selectedItem.name
  formState.description = store.selectedItem.description
  formState.isActive = store.selectedItem.isActive
}

onMounted(() => {
  if (store.modalMode != 'create') {
    setItem()
  }
})
</script>
<template>
  <div id="simulacrum-form">
    <V-Field grouped>
      <V-Control>
        <V-SwitchSegment
          v-model="formState.isActive"
          :disabled="store.modalMode == 'see'"
          label-true="Activo"
          label-false="Inactivo"
          color="success"
        />
      </V-Control>
    </V-Field>

    <div class="control has-validation">
      <V-Field>
        <V-Control>
          <p class="help">Nombre de la __name__</p>
          <input
            id="name"
            v-model="formState.name"
            :disabled="store.modalMode == 'see'"
            type="text"
            class="input"
            placeholder="Nombre"
          />
        </V-Control>
      </V-Field>
      <ValidationFormMessages
        v-if="errors['name']"
        :validation="errors['name']"
        lang="es"
        field="name"
      />
    </div>
    <div class="control has-validation">
      <V-Field>
        <V-Control>
          <p class="help">Descripción</p>
          <input
            id="description"
            v-model="formState.description"
            :disabled="store.modalMode == 'see'"
            type="text"
            class="input"
            placeholder="Descripción"
          />
        </V-Control>
      </V-Field>
      <ValidationFormMessages
        v-if="errors['description']"
        :validation="errors['description']"
        lang="es"
        field="description"
      />
      <div align="right">
        <V-IconButton
          v-if="isLoading"
          color="primary"
          outlined
          loading
          circle
          icon="feather:plus"
        />
        <V-Button
          v-if="!isLoading"
          color="danger"
          icon="feather:x"
          raised
          class="mr-2"
          rounded
          @click="store.closeModal"
        >
          {{ store.modalMode == 'see' ? 'Cerrar' : 'Cancelar' }}
        </V-Button>
        <V-Button
          v-if="!isLoading && store.modalMode != 'see'"
          type="submit"
          color="success"
          icon="feather:save"
          raised
          rounded
          @click="handleSubmit"
        >
          Guardar
        </V-Button>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
@import '../../../../../src/scss/abstracts/_variables.scss';
@import '../../../../../src/scss/abstracts/_mixins.scss';

#simulacrum-form {
  height: 75vh;
}
</style>
