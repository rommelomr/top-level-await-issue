<script setup lang="ts">
import { useHead } from '@vueuse/head'
import { watch, inject, onMounted, ref } from 'vue'
import { flexRowsBasic } from '/@src/data/documentation/table'
import { pageTitle } from '/@src/state/sidebarLayoutState'
import { reactive, computed } from 'vue'
import FormComponent from '../forms/index.vue'
import Details from '../details/index.vue'
import { User, UserTable } from '../../interfaces/users-interfaces'
import {
  UsersPaginatedService,
  UserService,
} from '../../services/User.services'
import { useUserStore } from '../../store/User.store'
import useNotyf from '/@src/composable/useNotyf'
import { useRoute, useRouter } from 'vue-router'
import Pagination from '../../../components/pagination/Pagination.vue'

let route = useRoute()
let router = useRouter()

const notif = useNotyf()
const swal = inject('$swal')

const store = useUserStore()
const activeTab = ref<TabId>('active')

pageTitle.value = 'Usuarios'
useHead({
  title: 'Usuarios',
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

const tableState: UserTable = reactive({
  total: 0,
  currentPage: 0,
  findCounter: 0,
  totalPage: 0,
  items: [],
  elementsForPage: 10,
  isActive: true,
  where: '',
})

const pagination = async () => {
  try {
    const response = await UsersPaginatedService.getPaginated(
      tableState.elementsForPage,
      tableState.currentPage,
      tableState.where,
      tableState.isActive
    )
    store.handelIsLoading('')

    tableState.findCounter = response.data.findCounter
    tableState.items = response.data.items
    tableState.total = response.data.total
    tableState.currentPage = response.data.currentPage
    tableState.totalPage = response.data.totalPage
  } catch (error) {
    store.handelIsLoading('')
    console.error(error)
  }
}
let search = ref('')
watch(search, (v) => {
  if (tableState.where != v) {
    alert()
    tableState.where = v
    if (route.query.page != 1) {
      router.replace({ query: { page: 1 } })
    }
    pagination()
  }
})
const deleteItem = async (id, i) => {
  alert(i)

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
        const response = await UserService.delete(id)

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

const tableGender = (gender) => {
  if (gender == 'male') return 'Masculino'
  if (gender == 'female') return 'Femenino'
  if (gender == 'other') return 'Otro'
}

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
                  v-model="search"
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
          @click="store.handelOpenModal('form', 'create')"
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
                  <span>Imagen</span>
                  <span>Nombre</span>
                  <span>Apellido</span>
                  <span>Género</span>
                  <span>Status</span>
                  <span class="cell-end">Actions</span>
                </div>
              </template>
              <template #body>
                <div
                  v-for="(item, i) in tableState.items"
                  :key="i"
                  class="flex-table-item"
                >
                  <div class="flex-table-cell">
                    <VAvatar :picture="item.avatarFile" />
                  </div>
                  <div class="flex-table-cell is-bold">
                    <span class="dark-text">{{ item.firstName }}</span>
                  </div>
                  <div class="flex-table-cell is-bold">
                    <span class="dark-text">{{ item.lastName }}</span>
                  </div>

                  <div class="flex-table-cell">
                    <span class="light-text">{{
                      tableGender(item.gender.toLowerCase())
                    }}</span>
                  </div>

                  <div class="flex-table-cell">
                    <span class="tag is-rounded">{{
                      item.isActive ? 'Activo' : 'Inactivo'
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
                          @click="store.setItemToSee(item)"
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
                          @click="store.setItemToEdit(item)"
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
                          @click="deleteItem(item.id, i)"
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

            <Pagination
              :list="tableState"
              :max-links-displayed="5"
              @onChangePage="pagination()"
            />
          </div>
        </div>
      </div>
      <!--V-modals-->
      <V-Modal
        v-if="store.modal === 'form'"
        :open="store.modal === 'form'"
        size="big"
        actions="right"
        @close="store.handelCloseModal()"
      >
        <template #content>
          <V-PlaceholderSection
            title="Usuarios"
            subtitle="Gestión de usuarios"
          />
          <FormComponent />
        </template>
      </V-Modal>

      <V-Modal
        :open="store.modal === 'detail'"
        size="small"
        actions="right"
        @close="store.handelCloseModal()"
      >
        <template #content>
          <Details />
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
