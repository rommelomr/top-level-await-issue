<script setup lang="ts">
import { onBeforeMount, onMounted, PropType, inject } from 'vue'
import { ref } from 'vue'
import { useCourseStore } from '/@src/modules/learning_path/courses/store/Course.store'
import LessonsForm from '../../../modules/learning_path/courses/components/forms/lessonsForm.vue'
import { VueDraggableNext } from 'vue-draggable-next'
import { LessonService } from '/@src/modules/learning_path/courses/services/Lesson.services'
import useNotyf from '/@src/composable/useNotyf'

const store = useCourseStore()
type CollapseItem = {
  name: string
  description: string
  url: string
  isVideo: boolean
  fileResource: string
  duration: string
  quiz: boolean
}

const props = defineProps({
  parentChapterKey: {
    type: Number,
    required: true,
  },
  items: {
    type: Array as PropType<CollapseItem[]>,
    required: true,
  },
  itemOpen: {
    type: Number,
    default: undefined,
  },
  withChevron: {
    type: Boolean,
    default: false,
  },
})

const changeLessonOrder = (moveEvent) => {
  let itemsAux = [...props.items]

  let removedItem = itemsAux.splice(moveEvent.oldIndex, 1)

  itemsAux.splice(moveEvent.newIndex, 0, removedItem[0])

  saveNewLessonsOrder(itemsAux)

  store.selectedItem.chapters[props.parentChapterKey].lessons = [...itemsAux]
}

const saveNewLessonsOrder = (items) => {
  for (let i in items) {
    items[i].order = i + 1
    console.log(items[i])
    LessonService.edit(items[i].id, items[i])
  }
}
const swal = inject('$swal')
const deleteLesson = async (id, key) => {
  swal
    .fire({
      title: '',
      text: 'Estas seguro?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si!',
    })
    .then(async (result) => {
      if (result.isConfirmed) {
        const response = await LessonService.delete(id)

        let notif = useNotyf()
        //@ts-ignore
        if (response.status == 200) {
          notif.success('Leccion eliminada con éxito')

          store.selectedItem.chapters[props.parentChapterKey].lessons.splice(
            key,
            1
          )
          store.closeLessonFormToEdit()
          internalItemOpen.value = undefined
        } else {
          notif.error('Errror en le petición')
        }
      }
    })
}
const internalItemOpen = ref<number | undefined>(props.itemOpen)
const toggle = (key: number) => {
  if (internalItemOpen.value === key) {
    internalItemOpen.value = undefined

    return
  }

  store.openLessonFormToEdit(props.parentChapterKey, key)
  internalItemOpen.value = key
  changeChevron()
}

const customChevron = ref(false)
const changeChevron = () => {
  customChevron.value = !customChevron.value
}
</script>

<template>
  <VueDraggableNext
    class="dragArea list-group w-full"
    :list="items"
    @change="changeLessonOrder"
  >
    <details
      v-for="(item, key) in items"
      :key="key"
      :class="[customChevron && 'has-chevron', !customChevron && 'has-plus']"
      :open="internalItemOpen === key || undefined"
      class="lesson-collapse"
    >
      <summary class="collapse-header" @click.prevent="() => toggle(key)">
        <h3>Lección {{ key + 1 }}: {{ item.name }}</h3>
        <div class="light-text" style="float: right">
          <i
            v-if="!customChevron"
            class="mx-2 lnir lnir-chevron-down"
            aria-hidden="true"
          ></i>

          <i
            v-if="customChevron"
            class="mx-2 lnir lnir-chevron-up"
            aria-hidden="true"
          ></i>
        </div>
      </summary>
      <div class="collapse-content">
        <div align="right">
          <V-Dropdown icon="feather:more-vertical" right="false">
            <template #content>
              <a
                href="#"
                class="dropdown-item custom-dropdown-item"
                @click="deleteLesson(item.id, key)"
              >
                Eliminar leccion
              </a>
            </template>
          </V-Dropdown>
        </div>
        <span class="light-text mb-6">Datos de la lección</span>
        <LessonsForm :parent-chapter-key="parentChapterKey" :lesson-key="key" />
      </div>
    </details>
  </VueDraggableNext>
</template>
<style>
.lesson-collapse {
  border: 1px solid rgb(94, 94, 94);
  border-radius: 7px;
  margin-top: 2%;
}
</style>
