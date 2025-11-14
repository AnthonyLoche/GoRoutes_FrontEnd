<script setup>
import { ref, computed, onMounted } from 'vue'
import { useGoRoutesStore } from '@/stores'
import FilterAside from './FilterAside.vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const goRoutesStore = useGoRoutesStore()
const search = ref('')
const showFiltersAside = ref(false)
const showAddDialog = ref(false)
const loading = ref(false)
const page = ref(1)
const itemsPerPage = ref(10)

const filters = ref({
  status: null,
  driver: null,
  vehicle: null,
})

const statusOptions = ['Ativa', 'Inativa', 'Em Andamento']
const driverOptions = computed(() => {
  return goRoutesStore.state.routes
    .filter(route => route.driver)
    .map(route => route.driver.user.name)
    .filter((value, index, self) => self.indexOf(value) === index)
})

const vehicleOptions = computed(() => {
  return goRoutesStore.state.routes
    .filter(route => route.vehicle)
    .map(route => `${route.vehicle.model} - ${route.vehicle.plate}`)
    .filter((value, index, self) => self.indexOf(value) === index)
})

const headers = [
  { title: 'ID', key: 'id', sortable: true },
  { title: 'Nome', key: 'name', sortable: true },
  { title: 'Origem', key: 'origin', sortable: true },
  { title: 'Destino', key: 'destination', sortable: true },
  { title: 'Motorista', key: 'driver', sortable: true },
  { title: 'Veículo', key: 'vehicle', sortable: true },
  { title: 'Passageiros', key: 'passengers', sortable: true },
  { title: 'Status', key: 'status', sortable: true },
  { title: 'Ações', key: 'actions', sortable: false, align: 'center' },
]

// Dados da tabela
const items = computed(() => {
  return goRoutesStore.state.routes.map((route) => {
    console.log(route)
    return {
      id: route.id,
      name: route.name,
      origin: route.origin,
      destination: route.destination,
      driver: route.driver ? route.driver.user.name : 'Sem motorista',
      vehicle: route.vehicle ? `${route.vehicle.model} - ${route.vehicle.plate}` : 'Sem veículo',
      passengers: route.passengers ? route.passengers?.length : 0,
      status: route.is_active ? 'Ativa' : 'Inativa',
      distance: `${(route.distance / 1000).toFixed(1)} km`,
      raw: route,
    }
  })
})

// Filtro por texto
const filteredItems = computed(() => {
  const term = search.value.toLowerCase()
  return items.value.filter(
    (item) =>
      item.name?.toLowerCase().includes(term) ||
      item.origin?.toLowerCase().includes(term) ||
      item.destination?.toLowerCase().includes(term) ||
      item.driver?.toLowerCase().includes(term)
  )
})

const totalItems = computed(() => filteredItems.value.length)
const pageCount = computed(() => Math.ceil(totalItems.value / itemsPerPage.value))
const startIndex = computed(() => (page.value - 1) * itemsPerPage.value + 1)
const endIndex = computed(() => Math.min(page.value * itemsPerPage.value, totalItems.value))

// Ações
const viewItem = (item) => {
  console.log('View item:', item)
  goRoutesStore.state.selectedRoute = item.raw
  router.push(`/default/admin/route/${item.id}`)
}

const track = (item) => {
  console.log('Track item:', item)
  goRoutesStore.state.selectedRoute = item.raw
  router.push(`/default/admin/route/${item.id}/track`)
}

const deleteItem = (item) => {
  if (confirm('Tem certeza que deseja excluir esta rota?')) {
    // Implementar delete route
    console.log('Delete item:', item.id)
  }
}

// On mount
onMounted(async () => {
  loading.value = true
  await goRoutesStore.getRoutes()
  loading.value = false
})
</script>

<template>
  <div class="pa-4">
    <div class="d-flex align-center mb-4">
      <div class="d-flex align-center">
        <span class="text-h6 mr-4">Filtros:</span>

        <v-text-field
          v-model="search"
          prepend-inner-icon="mdi-magnify"
          label="Buscar rotas..."
          single-line
          hide-details
          variant="outlined"
          density="compact"
          class="mr-3"
          style="width: 300px"
        />

        <v-btn
          icon="mdi-filter-variant"
          variant="outlined"
          class="mr-3"
          @click="showFiltersAside = true"
        />
      </div>

      <v-spacer />

      <div class="d-flex align-center">
        <v-btn prepend-icon="mdi-plus" color="primary" @click="router.push('/default/admin/routes/create')" rounded="1">
          ADICIONAR ROTA
        </v-btn>
      </div>
    </div>

    <!-- Tabela -->
    <v-data-table
      v-model:items-per-page="itemsPerPage"
      v-model:page="page"
      :headers="headers"
      :items="filteredItems"
      :search="search"
      class="elevation-1"
      :loading="loading"
      loading-text="Carregando rotas..."
    >
      <template #item.passengers="{ item }">
        <v-chip color="primary" variant="outlined" size="small">
          {{ item.passengers }}

          
        </v-chip>
      </template>

      <template #item.status="{ item }">
        <v-chip :color="item.status === 'Ativa' ? 'success' : 'error'" variant="flat" size="small">
          {{ item.status }}
        </v-chip>
      </template>

      <template #item.distance="{ item }">
        <span class="text-caption">{{ item.distance }}</span>
      </template>

      <template #item.actions="{ item }">
        <div class="d-flex justify-center align-center">
          <v-menu>
            <template #activator="{ props }">
              <v-btn icon="mdi-dots-vertical" variant="text" size="small" v-bind="props" />
            </template>
            <v-list density="compact">
              <v-list-item @click="viewItem(item)">
                <v-list-item-icon class="d-flex justify-center"><v-icon>mdi-eye</v-icon></v-list-item-icon>
                <v-list-item-title class="d-flex justify-center">Visualizar</v-list-item-title>
              </v-list-item>
              <v-list-item @click="track(item.raw)">
                <v-list-item-icon class="d-flex justify-center"><v-icon>mdi-radar</v-icon></v-list-item-icon>
                <v-list-item-title class="d-flex justify-center">Rastrear</v-list-item-title>
              </v-list-item>
              <v-list-item @click="deleteItem(item.raw)">
                <v-list-item-icon class="d-flex justify-center"><v-icon class="text-error">mdi-delete</v-icon></v-list-item-icon>
                <v-list-item-title class="text-error d-flex justify-center">Excluir</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </div>
      </template>

      <!-- Rodapé -->
      <template #bottom>
        <div class="d-flex align-center justify-space-between pa-4">
          <div class="text-body-2 text-medium-emphasis">
            Mostrando {{ startIndex }} a {{ endIndex }} de {{ totalItems }} registros
          </div>
          <v-pagination
            v-model="page"
            :length="pageCount"
            :total-visible="7"
            density="comfortable"
          />
        </div>
      </template>
    </v-data-table>

    <!-- Aside de filtros -->
    <transition name="v-slide-x-reverse-transition">
      <FilterAside
        v-if="showFiltersAside"
        :filters="filters"
        :status-options="statusOptions"
        :driver-options="driverOptions"
        :vehicle-options="vehicleOptions"
        @close="showFiltersAside = false"
      />
    </transition>

  </div>
</template>

<style scoped>
.v-data-table {
  border-radius: 8px;
}

.v-chip {
  font-weight: 500;
}

.text-error {
  color: rgb(var(--v-theme-error)) !important;
}

.v-data-table :deep(thead) {
  background-color: var(--primary-color);
  color: white;
}

.v-data-table :deep(th) {
  font-weight: bold;
}

.v-data-table :deep(thead tr:first-child th:first-child) {
  border-top-left-radius: 8px;
}

.v-data-table :deep(thead tr:first-child th:last-child) {
  border-top-right-radius: 8px;
}

.v-data-table :deep(th:hover .v-data-table-header__content) {
  color: var(--secondary-color);
  transition: color 0.3s ease;
}
</style>