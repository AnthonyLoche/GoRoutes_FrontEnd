<template>
  <div :class="{ disabled: goRoutesStore.state_create.daily_route.original }">
  <div class="passenger-route-selection-container" v-if="routePassengers.length">
    <div class="route-info-header">

      <div class="route-summary">
        <h3>👥 Passageiros da Rota</h3>
        <p>Selecione quais passageiros farão parte desta viagem</p>
        {{ goRoutesStore.state_create.daily_route }}
      </div>
      <div class="selection-stats">
        <div class="stat-item">
          <span class="stat-number">{{ selectedPassengers.length }}</span>
          <span class="stat-label">Selecionados</span>
        </div>
        <span class="stat-divider">/</span>
        <div class="stat-item">
          <span class="stat-number">{{ routePassengers.length }}</span>
          <span class="stat-label">Total</span>
        </div>
      </div>
    </div>

    <div class="filters-section">
      <div class="search-group">
        <div class="search-input">
          <span class="search-icon">🔍</span>
          <input 
            type="text" 
            v-model="searchQuery"
            placeholder="Buscar passageiro por nome ou endereço..."
          />
        </div>
      </div>
      <div class="action-buttons">
        <v-btn color="success" @click="selectAllPassengers" rounded="1">
          ✓ Selecionar Todos
        </v-btn>
        <v-btn color="warning" @click="clearAllSelection" rounded="1">
          ✗ Desmarcar Todos
        </v-btn>
      </div>
    </div>

    <div class="passengers-grid">
      <div 
        v-for="passenger in filteredPassengers" 
        :key="passenger.user.id"
        class="passenger-card"
        :class="{ selected: selectedPassengers.includes(passenger.user.id) }"
        @click="togglePassenger(passenger.user.id)"
      >
        <!-- Avatar/Foto -->
        <div class="passenger-avatar">
          <span class="avatar-initials">
            {{ getInitials(passenger.user.name) }}
          </span>
        </div>

        <div class="passenger-info">
          <div class="passenger-header">
            <h3 class="passenger-name">{{ passenger.user.name }}</h3>
          </div>
          <div class="passenger-details">
            <div class="detail-row">
              <span class="detail-icon">📍</span>
              <span class="detail-text">{{ passenger.user.address }}</span>
            </div>
            
          </div>
        </div>

        <div class="selection-checkbox">
          <div class="checkbox" :class="{ checked: selectedPassengers.includes(passenger.user.id) }">
            <span v-if="selectedPassengers.includes(passenger.user.id)" class="checkmark">✓</span>
          </div>
        </div>

        <div v-if="selectedPassengers.includes(passenger.user.id)" class="selection-overlay"></div>
      </div>
    </div>

    <div v-if="filteredPassengers.length === 0" class="empty-state">
      <div class="empty-icon">🚌</div>
      <h3>Nenhum passageiro encontrado</h3>
      <p>Tente ajustar os termos de busca</p>
    </div>

    <div class="selection-summary">
      <div class="summary-content">
        <div class="summary-info">
          <strong>{{ selectedPassengers.length }} de {{ routePassengers.length }} passageiros selecionados</strong>
          <p v-if="selectedPassengers.length > 0">
            Os passageiros selecionados farão parte desta viagem
          </p>
          <p v-else class="warning-text">
            ⚠️ Nenhum passageiro selecionado para esta viagem
          </p>
        </div>
        <div class="capacity-info">
          <div class="capacity-bar">
            <div 
              class="capacity-fill" 
              :style="{ width: `${capacityPercentage}%` }"
              :class="{ 'over-capacity': isOverCapacity }"
            ></div>
          </div>
          <span class="capacity-text" :class="{ 'over-capacity': isOverCapacity }">
            {{ selectedPassengers.length }}/{{ vehicleCapacity }} 
            <span v-if="isOverCapacity">(Excesso de {{ selectedPassengers.length - vehicleCapacity }})</span>
          </span>
        </div>
      </div>
    </div>
  </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useGoRoutesStore } from '@/stores'

const goRoutesStore = useGoRoutesStore()

const selectedPassengers = ref([])
const searchQuery = ref("")

const routePassengers = computed(() => {
  return goRoutesStore.state.selectedRouteToInit?.passengers || []
})
const vehicleCapacity = computed(() => {
  return goRoutesStore.state.selectedRouteToInit?.vehicle?.seats || 28
})

const filteredPassengers = computed(() => {
  if (!searchQuery.value) return routePassengers.value
  const query = searchQuery.value.toLowerCase()
  return routePassengers.value.filter(p => 
    p.user.name.toLowerCase().includes(query) ||
    p.user.address.toLowerCase().includes(query)
  )
})

const capacityPercentage = computed(() => {
  const percentage = (selectedPassengers.value.length / vehicleCapacity.value) * 100
  return Math.min(percentage, 100)
})

const isOverCapacity = computed(() => {
  return selectedPassengers.value.length > vehicleCapacity.value
})

watch(routePassengers, (newPassengers) => {
  if (newPassengers?.length) {
    selectedPassengers.value = newPassengers.map(p => p.user.id)
  }
}, { immediate: true })

const togglePassenger = (id) => {
  const passengerList = goRoutesStore.state_create.daily_route.passenger_list;

  if (selectedPassengers.value.includes(id)) {
    selectedPassengers.value = selectedPassengers.value.filter(pid => pid !== id)
    goRoutesStore.state_create.daily_route.passenger_list = passengerList.filter(pid => pid !== id);
  } else {
    selectedPassengers.value.push(id)
    goRoutesStore.state_create.daily_route.passenger_list.push(id);
  }
}

const selectAllPassengers = () => {
  selectedPassengers.value = routePassengers.value.map(p => p.user.id)
  goRoutesStore.state_create.daily_route.passenger_list = routePassengers.value.map(p => p.user.id)
}

const clearAllSelection = () => {
  selectedPassengers.value = [],
  goRoutesStore.state_create.daily_route.passenger_list = []
}

const getInitials = (name) => {
  if (!name) return 'ND'
  return name.split(' ').map(w => w.charAt(0)).join('').substring(0, 2).toUpperCase()
}
</script>


<style scoped>
.passenger-route-selection-container {
  --primary: #022840;
  --primary-dark: #011a2b;
  --secondary: #0d4f6b;
  --accent: #1a73e8;
  --white: #ffffff;
  --text: #334155;
  --text-light: #64748b;
  --shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  --radius: 12px;
  --success: #10b981;
  --warning: #f59e0b;
  --danger: #ef4444;
}

.disabled {
  background-color: rgba(255,255,255,0.9);
  opacity: 0.9;
}

/* importantíssimo: esta regra impede qualquer interação dos filhos (clicks, hover, focos) */
.disabled * {
  pointer-events: none;
  user-select: none;
  /* se quiser que pareça visualmente "desativado" */
  opacity: 0.7;
}

.passenger-route-selection-container {
  min-height: 100vh;
}

.route-info-header {
  background: white;
  border-radius: var(--radius);
  padding: 2rem;
  margin-bottom: 1rem;
  box-shadow: var(--shadow);
  display: flex;
  justify-content: space-between;
  align-items: center;
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
  margin-bottom: 0.5rem;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.passenger-name {
  color: var(--primary);
  font-size: 1.1rem;
  font-weight: 600;
  margin: 0;
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

/* Resumo da Seleção */
.selection-summary {
  background: white;
  border-radius: var(--radius);
  padding: 2rem;
  box-shadow: var(--shadow);
  position: relative;
  overflow: hidden;
}

.summary-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2rem;
  flex-wrap: wrap;
}

.summary-info {
  flex: 1;
}

.summary-info strong {
  color: var(--primary);
  font-size: 1.1rem;
  display: block;
  margin-bottom: 0.5rem;
}

.summary-info p {
  color: var(--text-light);
  margin: 0;
  font-size: 0.9rem;
}

.warning-text {
  color: var(--warning) !important;
  font-weight: 500;
}

.capacity-info {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.5rem;
  min-width: 200px;
}

.capacity-bar {
  width: 200px;
  height: 8px;
  background: #e2e8f0;
  border-radius: 4px;
  overflow: hidden;
}

.capacity-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--success), var(--accent));
  transition: all 0.3s ease;
  border-radius: 4px;
}

.capacity-fill.over-capacity {
  background: linear-gradient(90deg, var(--danger), var(--warning));
}

.capacity-text {
  font-size: 0.9rem;
  color: var(--text);
  font-weight: 500;
}

.capacity-text.over-capacity {
  color: var(--danger);
  font-weight: 600;
}

@media (max-width: 768px) {
  .route-info-header {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }
  
  .filters-section {
    flex-direction: column;
    align-items: stretch;
  }
  
  .search-group {
    min-width: auto;
    width: 100%;
  }
  
  .passengers-grid {
    grid-template-columns: 1fr;
  }
  
  .passenger-header {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .summary-content {
    flex-direction: column;
    text-align: center;
  }
  
  .capacity-info {
    align-items: center;
    width: 100%;
  }
  
  .capacity-bar {
    width: 100%;
    overflow: hidden;
  }
}
.route-summary h3 {
  color: var(--primary);
  margin: 0 0 0.5rem 0;
  font-size: 1.5rem;
  font-weight: 700;
}

.route-summary p {
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
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.search-group {
  flex: 1;
  min-width: 300px;
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

.action-buttons {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

/* Grid de Passageiros */
.passengers-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
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
}
</style>