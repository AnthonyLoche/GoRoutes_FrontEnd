<script setup>
import { ref, computed, onMounted } from 'vue'
import { usePassengersStore } from '@/stores'
import FilterAside from './AsideFilters.vue'
import AddPassengerModal from './AddPassengerModal.vue'
import { useRouter } from 'vue-router'
const router = useRouter()

const passengersStore = usePassengersStore()
const search = ref('')
const showFiltersAside = ref(false)
const showAddDialog = ref(false)
const loading = ref(false)
const page = ref(1)
const itemsPerPage = ref(6)

const filters = ref({
  carrier: null,
  orgPort: null,
  destPort: null,
  transitTime: null
})

const carrierOptions = ['Maersk', 'MSC', 'COSCO', 'CMA CGM', 'Evergreen']
const portOptions = ['Dhaka', 'Mumbai', 'Chennai', 'Kolkata', 'Singapore']

const headers = [
  { title: 'ID', key: 'ID', sortable: true },
  { title: 'Nome', key: 'Nome', sortable: true },
  { title: 'CPF', key: 'CPF', sortable: true },
  { title: 'Username', key: 'Username', sortable: true },
  { title: 'Email', key: 'Email', sortable: true },
  { title: 'Telefone', key: 'Telefone', sortable: true },
  { title: 'Endereço', key: 'Endereço', sortable: true },
  { title: 'Ações', key: 'actions', sortable: false, align: 'center' }
]

// Dados da tabela
const items = computed(() => {
  return passengersStore.state.passengers
    .filter(passenger => passenger.passenger_data)
    .map(passenger => {
      const address = passenger.passenger_data.address?.[0]
      return {
        ID: passenger.id,
        Nome: passenger.name,
        CNH: passenger.passenger_data.cnh,
        CPF: passenger.passenger_data.cpf,
        Username: passenger.username,
        Email: passenger.email,
        Telefone: passenger.telephone,
        Endereço: address
          ? `${address.street}, ${address.number} - ${address.city}/${address.state}`
          : 'N/A',
        raw: passenger
      }
    })
})

// Filtro por texto
const filteredItems = computed(() => {
  const term = search.value.toLowerCase()
  return items.value.filter(item =>
    item.Nome?.toLowerCase().includes(term) ||
    item.Email?.toLowerCase().includes(term) ||
    item.Username?.toLowerCase().includes(term)
  )
})

const totalItems = computed(() => filteredItems.value.length)
const pageCount = computed(() => Math.ceil(totalItems.value / itemsPerPage.value))
const startIndex = computed(() => (page.value - 1) * itemsPerPage.value + 1)
const endIndex = computed(() => Math.min(page.value * itemsPerPage.value, totalItems.value))

// Ações
const editItem = (item) => {
  console.log('Edit item:', item)
  passengersStore.state.selectedPassenger = item
  router.push(`/default/admin/passengers/${item.id}`)
}

const track = (item) => {
  console.log('Track item:', item)
  passengersStore.state.selectedPassenger = item
  router.push(`/default/admin/passengers/${item.id}/track`)
}

const deleteItem = (item) => {
  if (confirm('Are you sure you want to delete this item?')) {
    passengersStore.deletePassenger(item?.passenger_data?.id)
      .then(() => {
        console.log('Item deleted:', item?.passenger_data?.id)
        passengersStore.getPassengers()
      })
      .catch(error => {
        console.error('Error deleting item:', error)
      })
  }
}

// On mount
onMounted(async () => {
  loading.value = true
  await passengersStore.getPassengers()
  loading.value = false
})
</script>                            <v-text-field v-model="form.cnh" label="CNH" outlined />


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
          style="width: 300px;"
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
          rounded="1"
        >
          Adicionar Passageiro
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
      loading-text="Loading... Please wait"
    >
      
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
              <v-list-item @click="track(item.raw)">
                <v-list-item-icon class="d-flex justify-center"><v-icon>mdi-radar</v-icon></v-list-item-icon>
                <v-list-item-title class="d-flex justify-center">Rastrear</v-list-item-title>
              </v-list-item>
              <v-list-item @click="deleteItem(item.raw)">
                <v-list-item-icon class="d-flex justify-center"><v-icon class="text-error">mdi-delete</v-icon></v-list-item-icon>
                <v-list-item-title class="text-error d-flex justify-center" >Deletar</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </div>
      </template>

      <!-- Rodapé -->
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

    <!-- Aside de filtros com transição -->
    <transition name="v-slide-x-reverse-transition">
      <FilterAside
        v-if="showFiltersAside"
        :filters="filters"
        :carrier-options="carrierOptions"
        :port-options="portOptions"
        @close="showFiltersAside = false"
      />
    </transition>

    <!-- Modal de Adicionar Motorista -->
    <AddPassengerModal v-model="showAddDialog" />
  </div>
</template>

<style scoped>
a{
  margin: auto;
}
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
  color: var(--secondary-color); /* ex: amarelo */
  transition: color 0.3s ease;
}
</style>