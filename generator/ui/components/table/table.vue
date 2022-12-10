<script setup lang="ts">
import { useHead } from '@vueuse/head'
import { watch, inject, onMounted, ref } from 'vue'
import { flexRowsBasic } from '/@src/data/documentation/table'
import { pageTitle } from '/@src/state/sidebarLayoutState'
import { reactive, computed } from 'vue'
import __name__PascalCase__Form from '../forms/index.vue'
import Details from '../details/index.vue'
import {
  __name__PascalCase__,
  __name__PascalCase__Table,
} from '../../interfaces/__name__(kebabCase)-interfaces'
import {
  __name__PascalCase__sPaginatedService,
  __name__PascalCase__Service,
} from '../../services/__name__PascalCase__.services'
import { use__name__PascalCase__Store } from '../../store/__name__PascalCase__.store'
import useNotyf from '/@src/composable/useNotyf'
import Paginator from '/@src/modules/components/pagination/Paginator.vue'

let paginator_render = ref(0)
const onChangePage = (p) => {
  tableState.currentPage = p
  pagination()
}

const notif = useNotyf()
const swal = inject('$swal')

const store = use__name__PascalCase__Store()

pageTitle.value = '__name__PascalCase__'
useHead({
  title: '__name__PascalCase__',
})

const modalState = reactive({
  type: '',
})

///modals//
const handleOpenModalAdd = (selector) => {
  modalState.type = selector
}
const handleCloseModal = () => {
  modalState.type = ''
}
///modals//

///table//

const tableState: __name__PascalCase__Table = reactive({
  total: 0,
  currentPage: 0,
  totalPage: 0,
  items: [],
  elementsForPage: 10,
  isActive: true,
  where: '',
})

const pagination = async () => {
  try {
    const response = await __name__PascalCase__sPaginatedService.getPaginated(
      tableState.elementsForPage,
      tableState.currentPage,
      tableState.where,
      tableState.isActive
    )
    store.handelIsLoading('')
    tableState.items = response.data.items
    tableState.total = response.data.total
    tableState.currentPage = response.data.currentPage
    tableState.totalPage = response.data.totalPage
    paginator_render.value++
  } catch (error) {
    store.handelIsLoading('')
    console.error(error)
  }
}

const deleteItem = async (id) => {
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
        const response = await __name__PascalCase__Service.delete(id)
        pagination()
        //@ts-ignore
        if (response.status == 200) {
          notif.success('Ejecutado con éxito')
        } else {
          notif.error('Errror en le petición')
        }
      }
    })
}

watch(() => {
  if (store.isLoading === 'reload') {
    pagination()
  }
})
const nextPage = () => {
  tableState.currentPage++
  pagination()
}
const prevPage = () => {
  tableState.currentPage--
  pagination()
}

///table//

onMounted(() => {
  pagination()
})
</script>
<template>
  <V-Loader size="large" :active="store.isLoading == 'reload'">
    <div class="page-content-inner">
      <div class="projects-toolbar">
        <div class="control has-icon">
          <div class="column is-12">
            <V-Field grouped>
              <V-Control>
                <V-SwitchSegment
                  v-model="tableState.isActive"
                  label-true="Activos"
                  label-false="Inactivos"
                  color="success"
                  @change="pagination()"
                />
              </V-Control>
            </V-Field>
            <V-Field addons>
              <V-Control expanded>
                <input
                  v-model="tableState.where"
                  type="text"
                  class="input is-rounded"
                  placeholder="Buscar..."
                  @keyup.enter="pagination()"
                />
              </V-Control>
            </V-Field>
          </div>
        </div>

        <V-Button
          color="success"
          icon="fas fa-plus"
          raised
          rounded
          @click="store.openCreateItemModal()"
        >
          Agregar
        </V-Button>
      </div>

      <div class="columns">
        <div class="column is-12">
          <div class="mt-4">
            <!--V-FlexTabe-->
            <V-FlexTable>
              <template #header>
                <div class="flex-table-header">
                  <span>Nombre</span>
                  <span>Descripcion</span>
                  <span>Status</span>
                  <span class="cell-end">Actions</span>
                </div>
              </template>
              <template #body>
                <div
                  v-for="item in tableState.items"
                  :key="item.id"
                  class="flex-table-item"
                >
                  <div class="flex-table-cell is-bold">
                    <span class="dark-text">{{ item.name }}</span>
                  </div>
                  <div class="flex-table-cell">
                    <span class="light-text">{{ item.description }}</span>
                  </div>

                  <div class="flex-table-cell">
                    <span class="tag is-rounded">{{
                      item.description ? 'Activo' : 'Inactivo'
                    }}</span>
                  </div>
                  <div class="flex-table-cell cell-end">
                    <V-Dropdown
                      icon="feather:more-vertical"
                      class="is-pushed-mobile"
                      spaced
                      right
                    >
                      <template #content>
                        <a
                          role="menuitem"
                          href="#"
                          class="dropdown-item is-media"
                          @click="store.openSeeItemModal(item)"
                        >
                          <div class="icon">
                            <i aria-hidden="true" class="lnil lnil-eye"></i>
                          </div>
                          <div class="meta">
                            <span>Ver</span>
                          </div>
                        </a>
                        <a
                          role="menuitem"
                          href="#"
                          class="dropdown-item is-media"
                          @click="store.openEditItemModal(item)"
                        >
                          <div class="icon">
                            <i aria-hidden="true" class="lnil lnil-pencil"></i>
                          </div>
                          <div class="meta">
                            <span>Editar</span>
                          </div>
                        </a>
                        <hr class="dropdown-divider" />
                        <a
                          role="menuitem"
                          href="#"
                          class="dropdown-item is-media"
                          @click="deleteItem(item.id)"
                        >
                          <div class="icon">
                            <i
                              aria-hidden="true"
                              class="lnil lnil-trash-can-alt"
                            ></i>
                          </div>
                          <div class="meta">
                            <span>Borrar</span>
                          </div>
                        </a>
                      </template>
                    </V-Dropdown>
                  </div>
                </div>
              </template>
            </V-FlexTable>

            <div v-if="tableState.items.length < 1" class="search-results-body">
              <!--Search Placeholder -->
              <div class="page-placeholder">
                <div class="placeholder-content">
                  <img
                    class="light-image"
                    src="/@src/assets/illustrations/placeholders/search-7.svg"
                    alt=""
                  />
                  <img
                    class="dark-image"
                    src="/@src/assets/illustrations/placeholders/search-7-dark.svg"
                    alt=""
                  />
                  <h3>No hay resultados que mostrar</h3>
                </div>
              </div>
            </div>
            <Paginator
              v-if="tableState.totalPage > 1"
              :key="paginator_render"
              @onChangePage="onChangePage"
              :items-per-page="tableState.elementsForPage"
              :max-buttons="5"
              :total-items="tableState.total"
              :total-pages="Math.ceil(tableState.totalPage)"
              :current-page="tableState.currentPage"
            />
          </div>
        </div>
      </div>
      <!--V-modals-->
      <V-Modal
        v-if="store.modal != ''"
        :open="store.modal != ''"
        title="__name__"
        size="big"
        actions="right"
        @close="store.closeModal()"
      >
        <template #content>
          <pre>{{ store }}</pre>
          <__name__PascalCase__Form v-if="store.modal ==
          '__name__(kebabCase)-form'" />
        </template>
      </V-Modal>
      <!--V-modals-->
    </div>
  </V-Loader>
</template>

<style lang="scss">
@import '../../../../../src/scss/abstracts/_variables.scss';
@import '../../../../../src/scss/abstracts/_mixins.scss';

/* ==========================================================================
1. Projects Toolbar
========================================================================== */

.projects-toolbar {
  display: flex;
  align-items: center;
  margin-bottom: 20px;

  .avatar-stack {
    margin-left: 16px;
  }

  .button {
    margin-left: auto;
    min-width: 140px;
  }
}

.is-dark {
  .projects-toolbar {
    .avatar-stack {
      .avatar {
        border-color: lighten($dark-sidebar, 3%);
      }
    }
  }
}

@media only screen and (max-width: 767px) {
  .projects-toolbar {
    .avatar-stack {
      display: none;
    }

    .v-button {
      min-width: 110px;
    }
  }
}
</style>
