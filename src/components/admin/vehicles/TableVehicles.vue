<!-- eslint-disable vue/valid-v-slot -->
<template>
  <div class="pa-4">
    <div class="d-flex align-center mb-4">
      <div class="d-flex align-center">
        <span class="text-h6 mr-4">Filtros :</span>

        <v-text-field
          v-model="search"
          prepend-inner-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
          variant="outlined"
          density="compact"
          class="mr-3"
          style="max-width: 300px;"
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
        <v-btn
          prepend-icon="mdi-plus"
          color="primary"
          @click="showAddDialog = true"
        >
          Adicionar Veículo
        </v-btn>
      </div>
    </div>

    <v-data-table
      v-model:items-per-page="itemsPerPage"
      v-model:page="page"
      :headers="headers"
      :items="filteredItems"
      :search="search"
      class="elevation-1"
      :loading="loading"
      loading-text="Loading... Please wait"
    >
      <template #item.Foto="{ item }">
        <img
          v-if="item.Foto"
          :src="item.Foto"
          alt="Foto do veículo"
          style="width: 50px; height: 50px; border-radius: 50%; margin-top: 10px;"
        />
        <span v-else>N/A</span>
      </template>

      <template #item.Status="{ item }">
        <div class="d-flex align-center">
          <v-icon
            v-if="item.Status === 'disponível'"
            color="success"
            class="mr-2"
          >
            mdi-check-circle
          </v-icon>
          <v-icon
            v-else-if="item.Status === 'manutenção'"
            color="warning"
            class="mr-2"
          >
            mdi-wrench
          </v-icon>
          <v-icon
            v-else-if="item.Status === 'em rota'"
            color="info"
            class="mr-2"
          >
            mdi-truck
          </v-icon>
          <v-icon
            v-else
            color="error"
            class="mr-2"
          >
            mdi-block-helper
          </v-icon>
            {{ item.Status.charAt(0).toUpperCase() + item.Status.slice(1) }}
        </div>
      </template>

      <template #item.actions="{ item }">
        <div class="d-flex justify-center align-center">
          <v-menu>
            <template #activator="{ props }">
              <v-btn icon="mdi-dots-vertical" variant="text" size="small" v-bind="props" />
            </template>
            <v-list density="compact">
              <v-list-item @click="editItem(item.raw)">
                <v-list-item-icon class="d-flex justify-center"><v-icon>mdi-pencil</v-icon></v-list-item-icon>
                <v-list-item-title class="d-flex justify-center">Editar</v-list-item-title>
              </v-list-item>
              <v-list-item @click="deleteItem(item.raw)">
                <v-list-item-icon class="d-flex justify-center"><v-icon class="text-error">mdi-delete</v-icon></v-list-item-icon>
                <v-list-item-title class="text-error d-flex justify-center">Deletar</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </div>
      </template>

      <template #bottom>
        <div class="d-flex align-center justify-space-between pa-4">
          <div class="text-body-2 text-medium-emphasis">
            Showing {{ startIndex }} to {{ endIndex }} of {{ totalItems }} entries
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

    <AddVehicleModal v-model="showAddDialog" />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useVehiclesStore } from '@/stores'
import AddVehicleModal from './AddVehicleModal.vue'
import { useRouter } from 'vue-router'
const router = useRouter()

const vehiclesStore = useVehiclesStore()
const search = ref('')
const showAddDialog = ref(false)
const loading = ref(false)
const page = ref(1)
const itemsPerPage = ref(10)

const headers = [
  { title: "Foto", key: "Foto", sortable: false, align: "center" },
  { title: 'ID', key: 'ID', sortable: true },
  { title: 'Placa', key: 'Placa', sortable: true },
  { title: 'Modelo', key: 'Modelo', sortable: true },
  { title: 'Assentos', key: 'Assentos', sortable: true },
  { title: 'Status', key: 'Status', sortable: true },
  { title: 'Ações', key: 'actions', sortable: false, align: 'center' }
]

const items = computed(() => {
  return vehiclesStore.state.vehicles.map(vehicle => ({
    ID: vehicle.id,
    Placa: vehicle.plate,
    Modelo: vehicle.model,
    Assentos: vehicle.seats,
    Status: vehicle.status,
    Foto: vehicle.picture,  
    raw: vehicle
  }))
})

// Filtro por texto
const filteredItems = computed(() => {
  const term = search.value.toLowerCase()
  return items.value.filter(item =>
    item.Placa?.toLowerCase().includes(term) ||
    item.Modelo?.toLowerCase().includes(term) ||
    item.Status?.toLowerCase().includes(term)
  )
})

const totalItems = computed(() => filteredItems.value.length)
const pageCount = computed(() => Math.ceil(totalItems.value / itemsPerPage.value))
const startIndex = computed(() => (page.value - 1) * itemsPerPage.value + 1)
const endIndex = computed(() => Math.min(page.value * itemsPerPage.value, totalItems.value))

const editItem = (item) => {
  console.log('Edit item:', item)
  vehiclesStore.state.selectedVehicle = item
  router.push(`/default/admin/vehicles/${item.id}`)
}
const deleteItem = (item) => {
  if (confirm('Are you sure you want to delete this item?')) {
    vehiclesStore.deleteVehicle(item.id)
      .then(() => {
        console.log('Item deleted:', item.id)
        vehiclesStore.getVehicles()
      })
      .catch(error => {
        console.error('Error deleting item:', error)
      })
  }
}

onMounted(async () => {
  loading.value = true
  await vehiclesStore.getVehicles()
  loading.value = false
})
</script>

<style scoped>
.v-data-table {
  border-radius: 8px;
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
  color: var(--secondary-color); /* ex: amarelo */
  transition: color 0.3s ease;
}
</style>
