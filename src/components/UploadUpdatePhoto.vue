<script setup lang="ts">
import { computed, onMounted, ref, watch } from '@vue/runtime-core'

const props = defineProps({
  image: {
    type: String,
    require: true,
  },
  mode: {
    type: Number,
    default: 1,
  },
})

const image_url = ref('')
watch(
  () => props.image,
  (new_value, old_value) => {
    image_url.value = new_value
  }
)

let _mode = ref('')
watch(
  () => props.mode,
  (new_value) => {
    _mode.value = new_value
  }
)
onMounted(() => {
  _mode.value = props.mode
})
const cleanImage = () => {
  image_url.value = ''
  _mode.value = 'create'
  onRemoveFile()
}

const emit = defineEmits(['onAddFile', 'onRemoveFile'])

const onAddFile = (error: any, fileInfo: any) => {
  console.log(error, fileInfo)
  emit('onAddFile', { error, fileInfo })
}

const onRemoveFile = () => {
  emit('onRemoveFile')
}
</script>

<template>
  <VFlex
    v-if="_mode == 'create'"
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
      <!--

      -->
    </VControl>

    <label class="dark-inverted">Click para seleccionar una imagen</label>
  </VFlex>
  <VFlex
    v-else
    flex-wrap="wrap"
    align-items="flex-end"
    row-gap=".5rem"
    column-gap=".25rem"
  >
    <div>
      <V-Avatar :picture="image_url" size="xl" />
    </div>

    <div>
      <button
        v-if="_mode == 'edit'"
        class="button is-text mt-2"
        @click="cleanImage"
      >
        Elegir otra imagen
      </button>
    </div>
  </VFlex>
</template>
