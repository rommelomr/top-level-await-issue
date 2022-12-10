<script setup lang="ts">
import { PropType, watch, inject, computed, onMounted } from 'vue'
import { ref } from 'vue'
import Lessons from '../../../modules/learning_path/courses/components/lessons/index.vue'
import { LessonService } from '/@src/modules/learning_path/courses/services/Lesson.services'
import { useCourseStore } from '/@src/modules/learning_path/courses/store/Course.store'
import { VueDraggableNext } from 'vue-draggable-next'
import { ChapterService } from '/@src/modules/learning_path/courses/services/Chapter.services'
import useNotyf from '/@src/composable/useNotyf'
import SimpleSelector from '/@src/modules/components/pickers/general_picker_1/SimpleSelector.vue'

const setQuizz = async (chapter, quiz_id) => {
  let response = await ChapterService.edit(chapter.id, {
    quiz_id: quiz_id,
  })
  if (response.status == 200) {
    let notif = useNotyf()
    notif.success('Quiz agregado con exito')
  }
}

const swal = inject('$swal')

type CollapseItem = {
  name: string
}

const props = defineProps({
  items: {
    type: Array as PropType<CollapseItem[]>,
    required: true,
  },
  quizzes: {
    type: Array,
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

onMounted(() => {
  console.log(props.items)
})
const deleteChapter = async (id, key) => {
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
        const response = await ChapterService.delete(id)

        //@ts-ignore
        let notif = useNotyf()
        if (response.status == 200) {
          notif.success('Lección eliminada con éxito')

          store.modalMode = -1
          store.selectedItem.chapters.splice(key, 1)
          store.modalMode = 3
        } else {
          notif.error('Error en le petición')
        }
      }
    })
}
const changeChapterOrder = (moveEvent) => {
  let itemsAux = [...props.items]

  let removedItem = itemsAux.splice(moveEvent.oldIndex, 1)

  itemsAux.splice(moveEvent.newIndex, 0, removedItem[0])

  saveNewChaptersOrder(itemsAux)

  store.selectedItem.chapters = [...itemsAux]
}
const saveNewChaptersOrder = (items) => {
  for (let i in items) {
    items[i].order = i + 1
    console.log(items[i])

    ChapterService.edit(items[i].id, items[i])
  }
}
const internalItemOpen = ref<number | undefined>(props.itemOpen)
const store = useCourseStore()
const toggle = (key: number, item_id: number) => {
  if (internalItemOpen.value === key) {
    internalItemOpen.value = undefined
    return
  }

  internalItemOpen.value = key
  setLessonChapters(item_id, key)
}
const customChevron = ref(false)
const changeChevron = () => {
  customChevron.value = !customChevron.value
}

const setLessonChapters = async (item_id, key) => {
  const store = useCourseStore()

  if (store.selectedItem.chapters[key].lessons == undefined) {
    store.setChapterId(item_id)
    const lessons = await LessonService.getAllByParentId(item_id)
    store.selectedItem.chapters[key].lessons = lessons.data
  }
}
</script>

<template>
  <VueDraggableNext
    class="dragArea list-group w-full"
    :list="items"
    @change="changeChapterOrder"
  >
    <details
      v-for="(item, key) in items"
      :key="key"
      :class="[customChevron && 'has-chevron', !customChevron && 'has-plus']"
      :open="internalItemOpen === key || undefined"
      class="collapse"
    >
      <summary
        class="collapse-header"
        @click.prevent="() => toggle(key, item.id)"
        @click="changeChevron()"
      >
        <h3>Capítulo {{ key + 1 }}: {{ item.name }}</h3>

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
                @click="deleteChapter(item.id, key)"
              >
                Eliminar capitulo
              </a>
            </template>
          </V-Dropdown>
        </div>
        <Lessons :parent-chapter-key="key" />

        <div v-if="item.Lessons.length > 0 || store.first_added">
          <p><b>Quiz del capítulo</b></p>
          <SimpleSelector
            placeholder="Buscar un quiz"
            :items="quizzes"
            :selected="item.quiz_id"
            v-slot="props"
          >
            <div align="center">
              <button
                class="button is-small is-success"
                @click="setQuizz(item, props.selected)"
              >
                Guardar
              </button>
            </div>
          </SimpleSelector>
        </div>
      </div>
    </details>
  </VueDraggableNext>
</template>
<style>
.custom-dropdown-item {
  width: 67% !important;
}
</style>
