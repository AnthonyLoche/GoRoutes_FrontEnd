<template>
  <div class="passenger-selection-container">
    <!-- Filtros -->
    <div class="filters-section">
      <div class="search-group">
        <div class="search-input">
          <span class="search-icon">🔍</span>
          <input 
            type="text" 
            v-model="searchQuery"
            placeholder="Buscar por nome, email ou endereço..."
          />
        </div>
      </div>
      <div class="filter-group">
        <label class="filter-label">Filtrar por:</label>
        
        <!-- Select de Série -->
        <div class="filter-select-wrapper">
          <v-select
            v-model="gradeFilter"
            :items="availableGrades"
            placeholder="Todas as séries"
            variant="outlined"
            density="compact"
            hide-details
          ></v-select>
        </div>

        <!-- Select de Bairro -->
        <div class="filter-select-wrapper">
          <v-select
            v-model="neighborhoodFilter"
            :items="availableNeighborhoods"
            placeholder="Todos os bairros"
            variant="outlined"
            density="compact"
            hide-details
          ></v-select>
        </div>

        <!-- Select de Tipo -->
        <div class="filter-select-wrapper">
          <v-select
            v-model="studentFilter"
            :items="studentTypes"
            placeholder="Todos os tipos"
            variant="outlined"
            density="compact"
            hide-details
          ></v-select>
        </div>
        <div class="action-buttons">
          <v-btn color="error" @click="clearAllSelection" rounded="1">
            ✗ Limpar Seleção
          </v-btn>
        </div>
      </div>
    </div>

    <div class="passengers-grid">
      <div 
        v-for="passenger in filteredPassengers" 
        :key="passenger.id"
        class="passenger-card"
        :class="{ 
          selected: selectedPassengers.includes(passenger.id),
          student: passenger.passenger_data?.is_student
        }"
        @click="togglePassenger(passenger.id)"
      >
        <!-- Avatar/Foto -->
        <div class="passenger-avatar">
          <img 
            v-if="passenger.picture_file" 
            :src="passenger.picture_file" 
            :alt="passenger.name"
            class="avatar-image"
          />
          <span v-else class="avatar-initials">
            {{ getInitials(passenger.name) }}
          </span>
        </div>

        <!-- Informações do Passageiro -->
        <div class="passenger-info">
          <div class="passenger-header">
            <h3 class="passenger-name">{{ passenger.name }}</h3>
                <span class="detail-icon">-</span>
              <span class="detail-text">{{ formatPhone(passenger.telephone) }}</span>
          </div>
          
          <div class="passenger-details">
            <div class="detail-row" v-if="getMainAddress(passenger)">
              <span class="detail-icon">📍</span>
              <span class="detail-text">{{ getMainAddress(passenger) }}</span>
            </div>
          </div>
        </div>

        <div class="selection-checkbox">
          <div class="checkbox" :class="{ checked: selectedPassengers.includes(passenger.id) }">
            <span v-if="selectedPassengers.includes(passenger.id)" class="checkmark">✓</span>
          </div>
        </div>

        <div v-if="selectedPassengers.includes(passenger.id)" class="selection-overlay"></div>
      </div>
    </div>

    <div v-if="filteredPassengers.length === 0" class="empty-state">
      <div class="empty-icon">🚌</div>
      <h3>Nenhum passageiro encontrado</h3>
      <p>Tente ajustar os filtros ou termos de busca</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from "vue"
import { usePassengersStore, useGoRoutesStore } from "@/stores"

const passengersStore = usePassengersStore()
const goRoutesStore = useGoRoutesStore()

const props = defineProps({
  preSelected: {
    type: Array,
    default: () => []
  }
})

// Usa os passageiros selecionados da store
const selectedPassengers = ref([...goRoutesStore.state_create.create_route.passengers_list])

const searchQuery = ref("")
const gradeFilter = ref("")
const neighborhoodFilter = ref("")
const studentFilter = ref("")

// Opções para o select de tipo de estudante
const studentTypes = [
  { title: 'Todos os tipos', value: '' },
  { title: 'Apenas estudantes', value: 'true' },
  { title: 'Não estudantes', value: 'false' }
]

const allPassengers = computed(() => passengersStore.state.passengers)

const availableGrades = computed(() => {
  const grades = new Set()
  allPassengers.value.forEach(passenger => {
    if (passenger.passenger_data?.student_data?.grade) {
      grades.add(passenger.passenger_data.student_data.grade)
    }
  })
  const gradeArray = Array.from(grades).sort()
  return [
    { title: 'Todas as séries', value: '' },
    ...gradeArray.map(grade => ({ title: grade, value: grade }))
  ]
})

const availableNeighborhoods = computed(() => {
  const neighborhoods = new Set()
  allPassengers.value.forEach(passenger => {
    const address = passenger.passenger_data?.address?.find(addr => addr.is_main)
    if (address?.neighborhood) {
      neighborhoods.add(address.neighborhood)
    }
  })
  const neighborhoodArray = Array.from(neighborhoods).sort()
  return [
    { title: 'Todos os bairros', value: '' },
    ...neighborhoodArray.map(neighborhood => ({ title: neighborhood, value: neighborhood }))
  ]
})

const filteredPassengers = computed(() => {
  let filtered = allPassengers.value

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(passenger => 
      passenger.name.toLowerCase().includes(query) ||
      passenger.email.toLowerCase().includes(query) ||
      getMainAddress(passenger)?.toLowerCase().includes(query)
    )
  }

  if (gradeFilter.value) {
    filtered = filtered.filter(passenger => 
      passenger.passenger_data?.student_data?.grade === gradeFilter.value
    )
  }

  if (neighborhoodFilter.value) {
    filtered = filtered.filter(passenger => {
      const address = passenger.passenger_data?.address?.find(addr => addr.is_main)
      return address?.neighborhood === neighborhoodFilter.value
    })
  }

  if (studentFilter.value !== "") {
    const isStudent = studentFilter.value === "true"
    filtered = filtered.filter(passenger => 
      passenger.passenger_data?.is_student === isStudent
    )
  }

  return filtered
})

const togglePassenger = (passengerId) => {
  if (selectedPassengers.value.includes(passengerId)) {
    selectedPassengers.value = selectedPassengers.value.filter(id => id !== passengerId)
  } else {
    selectedPassengers.value.push(passengerId)
  }
}

const clearAllSelection = () => {
  selectedPassengers.value = []
}

const getInitials = (name) => {
  return name.split(" ").map(word => word.charAt(0)).join("").substring(0, 2).toUpperCase()
}

const formatPhone = (phone) => {
  if (!phone) return "Não informado"
  return phone.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3")
}

const getMainAddress = (passenger) => {
  const address = passenger.passenger_data?.address?.find(addr => addr.is_main)
  if (!address) return null
  return `${address.street}, ${address.number} - ${address.neighborhood}, ${address.city} - ${address.state}`
}

// Sincroniza com a store
watch(selectedPassengers, (newValue) => {
  goRoutesStore.state_create.create_route.passengers_list = [...newValue]
}, { deep: true })

onMounted(() => {
  passengersStore.getPassengers()

  if (props.preSelected.length > 0) {
    selectedPassengers.value = [...props.preSelected]
  }
})
</script>


<style scoped>
.passenger-selection-container {
  --primary: #022840;
  --primary-dark: #011a2b;
  --secondary: #0d4f6b;
  --accent: #1a73e8;
  --white: #ffffff;
  --bg-light: #f8fafc;
  --text: #334155;
  --text-light: #64748b;
  --shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  --radius: 12px;
  --success: #10b981;
  --warning: #f59e0b;
  --danger: #ef4444;
}

.passenger-selection-container {
  min-height: 100vh;
}

/* Header */
.selection-header {
  background: white;
  border-radius: var(--radius);
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: var(--shadow);
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  overflow: hidden;
}

.selection-header::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, var(--primary), var(--accent));
}

.header-content {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.header-icon {
  font-size: 2.5rem;
  background: linear-gradient(135deg, var(--primary), var(--accent));
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
}

.selection-header h1 {
  color: var(--primary);
  margin: 0;
  font-size: 1.8rem;
  font-weight: 700;
}

.selection-header p {
  color: var(--text-light);
  margin: 0;
  font-size: 0.9rem;
}

.selection-stats {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.stat-item {
  text-align: center;
}

.stat-number {
  display: block;
  font-size: 2rem;
  font-weight: 700;
  background: linear-gradient(135deg, var(--primary), var(--accent));
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
}

.stat-label {
  font-size: 0.8rem;
  color: var(--text-light);
  text-transform: uppercase;
  font-weight: 500;
}

.stat-divider {
  color: var(--text-light);
  font-size: 1.5rem;
}

/* Filtros */
.filters-section {
  background: white;
  border-radius: var(--radius);
  padding: 1.5rem;
  margin-bottom: 2rem;
  box-shadow: var(--shadow);
  display: grid;
  gap: 1rem;
}

.search-group {
  grid-column: 1 / -1;
}

.search-input {
  position: relative;
  width: 100%;
}

.search-icon {
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: var(--text-light);
}

.search-input input {
  width: 100%;
  padding: 0.75rem 0.75rem 0.75rem 3rem;
  border: 2px solid #e2e8f0;
  border-radius: var(--radius);
  font-size: 0.9rem;
  transition: all 0.3s ease;
}

.search-input input:focus {
  outline: none;
  border-color: var(--accent);
  box-shadow: 0 0 0 3px rgba(26, 115, 232, 0.1);
}

.filter-group {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.filter-label {
  color: var(--text);
  font-weight: 500;
  font-size: 0.9rem;
}

.filter-select-wrapper {
  min-width: 150px;
}

.filter-select-wrapper .v-select {
  font-size: 0.9rem;
}

.action-buttons {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.select-all-btn,
.clear-all-btn {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: var(--radius);
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.select-all-btn {
  background: linear-gradient(135deg, var(--success), #059669);
  color: white;
}

.clear-all-btn {
  background: linear-gradient(135deg, var(--danger), #dc2626);
  color: white;
}

.select-all-btn:hover,
.clear-all-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

.passengers-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.passenger-card {
  background: white;
  border-radius: var(--radius);
  padding: 1rem;
  box-shadow: var(--shadow);
  cursor: pointer;
  transition: all 0.4s ease;
  border: 2px solid transparent;
  position: relative;
  overflow: hidden;
}

.passenger-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, var(--primary), var(--accent));
  transform: scaleX(0);
  transition: transform 0.3s ease;
}



.passenger-card.selected {
  border-color: var(--accent);
  background: linear-gradient(135deg, rgba(26, 115, 232, 0.03), rgba(2, 40, 64, 0.03));
}

.passenger-card.selected::before {
  transform: scaleX(1);
}

.selection-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(26, 115, 232, 0.05), rgba(2, 40, 64, 0.05));
  pointer-events: none;
}

.passenger-avatar {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  overflow: hidden;
  margin-bottom: 1rem;
  position: relative;
  border: 3px solid transparent;
  background: linear-gradient(white, white) padding-box,
              linear-gradient(45deg, var(--primary), var(--accent)) border-box;
}

.avatar-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.avatar-initials {
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, var(--primary), var(--accent));
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
  font-size: 1.2rem;
}

.passenger-info {
  flex: 1;
}

.passenger-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom:.2rem;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.passenger-name {
  color: var(--primary);
  font-size: 1.1rem;
  font-weight: 600;
  margin: 0;
}

.passenger-badges {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.badge {
  padding: 0.25rem 0.75rem;
  border-radius: 15px;
  font-size: 0.7rem;
  font-weight: 500;
}

.student-badge {
  background: linear-gradient(135deg, var(--success), #059669);
  color: white;
}

.inactive-badge {
  background: linear-gradient(135deg, var(--warning), #d97706);
  color: white;
}

.passenger-details {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.detail-row {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
}

.detail-icon {
  width: 20px;
  text-align: center;
}

.detail-text {
  color: var(--text);
  flex: 1;
}

/* Checkbox de Seleção */
.selection-checkbox {
  position: absolute;
  top: 1rem;
  right: 1rem;
}

.checkbox {
  width: 24px;
  height: 24px;
  border: 2px solid #e2e8f0;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  background: white;
}

.checkbox.checked {
  background: linear-gradient(135deg, var(--primary), var(--accent));
  border-color: var(--accent);
  color: white;
}

.checkmark {
  font-size: 0.9rem;
  font-weight: bold;
}

/* Estado Vazio */
.empty-state {
  text-align: center;
  padding: 4rem 2rem;
  color: var(--text-light);
}

.empty-icon {
  font-size: 4rem;
  margin-bottom: 1rem;
}

.empty-state h3 {
  color: var(--text);
  margin-bottom: 0.5rem;
}

/* Footer */
.footer-actions {
  background: white;
  border-radius: var(--radius);
  padding: 2rem;
  box-shadow: var(--shadow);
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2rem;
  position: relative;
  overflow: hidden;
}

.footer-actions::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, var(--success), var(--accent));
}

.selected-info {
  flex: 1;
}

.selected-info strong {
  color: var(--primary);
  font-size: 1.1rem;
}

.selected-info p {
  color: var(--text-light);
  margin: 0.5rem 0 0 0;
  font-size: 0.9rem;
}

.cancel-btn,
.confirm-btn {
  padding: 0.75rem 2rem;
  border: none;
  border-radius: var(--radius);
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.cancel-btn {
  background: #e2e8f0;
  color: var(--text);
}

.confirm-btn {
  background: linear-gradient(135deg, var(--primary), var(--accent));
  color: white;
  box-shadow: 0 4px 15px rgba(26, 115, 232, 0.3);
}

.confirm-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.cancel-btn:hover:not(:disabled),
.confirm-btn:hover:not(:disabled) {
  transform: translateY(-2px);
}

.confirm-btn:hover:not(:disabled) {
  box-shadow: 0 8px 25px rgba(26, 115, 232, 0.4);
}

/* Responsivo */
@media (max-width: 768px) {
  .passenger-selection-container {
    padding: 1rem;
  }
  
  .selection-header {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }
  
  .passengers-grid {
    grid-template-columns: 1fr;
  }
  
  .filter-group {
    flex-direction: column;
    align-items: stretch;
  }
  
  .filter-select-wrapper {
    width: 100%;
  }
  
  .footer-actions {
    flex-direction: column;
    text-align: center;
  }
  
  .passenger-header {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>