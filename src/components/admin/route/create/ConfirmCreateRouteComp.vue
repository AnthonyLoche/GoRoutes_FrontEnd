<template>
  <div class="confirmation-container">
    <div class="confirmation-actions">
      <v-alert
        v-if="!isFormValid"
        type="warning"
        variant="tonal"
        class="mb-4"
      >
        Preencha todos os campos obrigatórios antes de criar a rota.
      </v-alert>
      
      <div class="confirmation-grid">
        <!-- Resumo da Rota -->
        <div class="confirmation-section">
          <div class="section-header">
            <h3>📋 Resumo da Rota</h3>
          </div>
          
          <div class="summary-content">
            <div class="summary-item">
              <strong>Nome da Rota:</strong>
              <span>{{ routeData.name }}</span>
            </div>
            
            <div class="summary-item">
              <strong>Origem:</strong>
              <span>{{ routeData.origin }}</span>
            </div>
            
            <div class="summary-item">
              <strong>Destino:</strong>
              <span>{{ routeData.destination }}</span>
            </div>
            
            <div class="summary-item">
              <strong>Horário:</strong>
              <span>{{ routeData.init_hour }} - {{ routeData.end_hour }}</span>
            </div>
            
            <div class="summary-item">
              <strong>Recalculo Automático:</strong>
              <span>{{ routeData.auto_recalculate ? 'Sim' : 'Não' }}</span>
            </div>
            
            <div class="summary-item">
              <strong>Veículo:</strong>
              <span>{{ getVehicleName(routeData.vehicle) }}</span>
            </div>
            
            <div class="summary-item">
              <strong>Motorista:</strong>
              <span>{{ getDriverName(routeData.driver) }}</span>
            </div>
          </div>
        </div>

        <!-- Passageiros Selecionados -->
        <div class="confirmation-section">
          <div class="section-header">
            <h3>👥 Passageiros Selecionados</h3>
            <span class="passenger-count">{{ selectedPassengersCount }} passageiros</span>
          </div>
          
          <div class="passengers-list">
            <div 
              v-for="passenger in selectedPassengersDetails" 
              :key="passenger.id"
              class="passenger-summary"
            >
              <div class="passenger-avatar-small">
                <img 
                  v-if="passenger.picture_file" 
                  :src="passenger.picture_file" 
                  :alt="passenger.name"
                  class="avatar-image"
                />
                <span v-else class="avatar-initials-small">
                  {{ getInitials(passenger.name) }}
                </span>
              </div>
              
              <div class="passenger-info-small">
                <div class="passenger-name-small">{{ passenger.name }}</div>
                <div class="passenger-details-small">
                  {{ getMainAddress(passenger) }}
                </div>
              </div>
            </div>
          </div>
          
          <div v-if="selectedPassengersCount === 0" class="empty-passengers">
            <v-icon color="grey" class="empty-icon">mdi-account-alert</v-icon>
            <p>Nenhum passageiro selecionado</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useGoRoutesStore, usePassengersStore, useDriversStore, useVehiclesStore } from '@/stores'

const goRoutesStore = useGoRoutesStore()
const passengersStore = usePassengersStore()
const driversStore = useDriversStore()
const vehiclesStore = useVehiclesStore()

const routeData = computed(() => goRoutesStore.state_create.create_route)

const selectedPassengersCount = computed(() => routeData.value.passengers_list.length)

const selectedPassengersDetails = computed(() => {
  return passengersStore.state.passengers.filter(passenger => 
    routeData.value.passengers_list.includes(passenger.id)
  )
})

const isFormValid = computed(() => {
  const data = routeData.value
  return (
    data.name &&
    data.origin &&
    data.destination &&
    data.init_hour &&
    data.end_hour &&
    data.vehicle &&
    data.driver
  )
})

const getVehicleName = (vehicleId) => {
  const vehicle = vehiclesStore.state.vehicles.find(v => v.id === vehicleId)
  return vehicle ? `${vehicle.model} - ${vehicle.plate}` : 'Não selecionado'
}

const getDriverName = (driverId) => {
  const driver = driversStore.state.drivers.find(d => d.driver_data?.id === driverId)
  return driver ? driver.name : 'Não selecionado'
}

const getInitials = (name) => {
  return name.split(" ").map(word => word.charAt(0)).join("").substring(0, 2).toUpperCase()
}

const getMainAddress = (passenger) => {
  const address = passenger.passenger_data?.address?.find(addr => addr.is_main)
  if (!address) return 'Endereço não informado'
  return `${address.street}, ${address.number} - ${address.neighborhood}`
}
</script>

<style scoped>
.confirmation-container {
  min-height: 60vh;
}

.confirmation-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 2rem;
}

.confirmation-section {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  position: relative;
  overflow: hidden;
}

.confirmation-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, #022840, #1a73e8);
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #f8fafc;
}

.section-header h3 {
  color: #022840;
  margin: 0;
  font-size: 1.2rem;
  font-weight: 600;
}

.passenger-count {
  background: #1a73e8;
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 15px;
  font-size: 0.8rem;
  font-weight: 500;
}

.summary-content {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.summary-item {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 0.75rem 0;
  border-bottom: 1px solid #f1f5f9;
}

.summary-item:last-child {
  border-bottom: none;
}

.summary-item strong {
  color: #334155;
  font-weight: 600;
  min-width: 160px;
}

.summary-item span {
  color: #64748b;
  text-align: right;
  flex: 1;
}

.passengers-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-height: 400px;
  overflow-y: auto;
}

.passenger-summary {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.passenger-summary:hover {
  border-color: #1a73e8;
  background: #f8fafc;
}

.passenger-avatar-small {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
  flex-shrink: 0;
  border: 2px solid transparent;
  background: linear-gradient(white, white) padding-box,
              linear-gradient(45deg, #022840, #1a73e8) border-box;
}

.avatar-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.avatar-initials-small {
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #022840, #1a73e8);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
  font-size: 0.9rem;
}

.passenger-info-small {
  flex: 1;
  min-width: 0;
}

.passenger-name-small {
  color: #022840;
  font-weight: 600;
  margin-bottom: 0.25rem;
}

.passenger-details-small {
  color: #64748b;
  font-size: 0.8rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.empty-passengers {
  text-align: center;
  padding: 3rem 2rem;
  color: #64748b;
}

.empty-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.confirmation-actions {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

@media (max-width: 768px) {
  .confirmation-container {
    padding: 1rem;
  }
  
  .confirmation-grid {
    grid-template-columns: 1fr;
  }
  
  .summary-item {
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .summary-item span {
    text-align: left;
  }
}
</style>