<template>
  <div class="first-form-edit-route" v-if="localRouteData">
    <div class="form-grid">
      <div class="form-section">
        <div class="section-header">
          <h3>📋 Informações Básicas</h3>
        </div>
        <div class="form-group">
          <label for="route-name">Nome da Rota</label>
          <input 
            id="route-name"
            type="text" 
            v-model="localRouteData.name"
            placeholder="Ex: Rota Sul"
            disabled
          />
        </div>
        <div class="form-group">
          <label for="origin">Origem</label>
          <input 
            id="origin"
            v-model="localRouteData.origin"
            placeholder="Endereço de origem completo"
          />
        </div>
        <div class="form-group">
          <label for="destination">Destino</label>
          <input 
            id="destination"
            v-model="localRouteData.destination"
            placeholder="Endereço de destino completo"
          />
        </div>
        <div class="form-group">
          <label class="distance-label">
            📏 Distância Total
          </label>
          <div class="distance-display">
            <span class="distance-value">{{ formatDistance(localRouteData.distance) }}</span>
            <small>Calculada automaticamente com base na rota</small>
          </div>
        </div>
        <div class="form-group">
          <label class="checkbox-label">
            <input 
              type="checkbox" 
              v-model="localRouteData.auto_recalculate"
            />
            <span class="checkmark">✓</span>
            Recalcular automaticamente
          </label>
          <small>O sistema recalculará a rota automaticamente baseado nos passageiros</small>
        </div>
      </div>

      <div class="form-section">
        <div class="section-header">
          <h3>🕐 Horários</h3>
        </div>
        <div class="time-grid">
          <div class="form-group">
            <label for="init-hour">Horário de Início</label>
            <input 
              id="init-hour"
              type="time" 
              v-model="localRouteData.init_hour"
            />
          </div>
          <div class="form-group">
            <label for="end-hour">Horário de Fim</label>
            <input 
              id="end-hour"
              type="time" 
              v-model="localRouteData.end_hour"
            />
          </div>
        </div>
        
        <div class="section-header">
          <h3>🚗 Veículo e Motorista</h3>
        </div>
        
        <!-- Veículo Atual -->
        <div class="current-vehicle" v-if="localRouteData.vehicle">
          <h4>Veículo Atual</h4>
          <div class="vehicle-card">
            <div class="vehicle-info">
              <div class="vehicle-header">
                <span class="vehicle-model">{{ localRouteData.vehicle.model }}</span>
                <span class="vehicle-plate">{{ localRouteData.vehicle.plate }}</span>
              </div>
              <div class="vehicle-details">
                <span class="vehicle-seats">🪑 {{ localRouteData.vehicle.seats }} assentos</span>
                <span class="vehicle-status" :class="localRouteData.vehicle.status">
                  {{ localRouteData.vehicle.status }}
                </span>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Motorista Atual -->
        <div class="current-driver" v-if="localRouteData.driver">
          <h4>Motorista Atual</h4>
          <div class="driver-card">
            <div class="driver-avatar">
              <img 
                v-if="localRouteData.driver.user.picture?.file" 
                :src="localRouteData.driver.user.picture.file" 
                :alt="localRouteData.driver.user.name"
                class="avatar-image"
              />
              <span v-else class="avatar-initials">
                {{ getInitials(localRouteData.driver.user.name) }}
              </span>
            </div>
            <div class="driver-info">
              <div class="driver-name">{{ localRouteData.driver.user.name }}</div>
              <div class="driver-details">
                <span>📞 {{ formatPhone(localRouteData.driver.user.telephone) }}</span>
                <span>🪪 CNH: {{ localRouteData.driver.cnh }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Lista de Passageiros -->
        
      </div>        
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useGoRoutesStore } from '@/stores'

const goRoutesStore = useGoRoutesStore()

// usa direto o objeto da store
const localRouteData = computed(() => goRoutesStore.state.selectedRouteToInit)

const formatDistance = (distance) => {
  if (!distance) return '0 km'
  const km = (distance / 1000).toFixed(1)
  return `${km} km`
}

const getInitials = (name) => {
  if (!name) return 'ND'
  return name.split(' ').map(word => word.charAt(0)).join('').substring(0, 2).toUpperCase()
}

const formatPhone = (phone) => {
  if (!phone) return 'Não informado'
  return phone.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3')
}
</script>

<style scoped>
.first-form-edit-route {
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
}

.first-form-edit-route {
  /* padding: 2rem; */
  min-height:75vh;
  font-family: 'Poppins', -apple-system, BlinkMacSystemFont, sans-serif;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
}

.form-section {
  background: white;
  border-radius: var(--radius);
  padding: 2rem;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid var(--bg-light);
}

.section-header h3 {
  color: var(--primary);
  margin: 0;
  font-size: 1.2rem;
  font-weight: 600;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  color: var(--text);
  font-weight: 500;
  font-size: 0.9rem;
}

.form-group input,
.form-group select {
  width: 100%;
  padding: 0.75rem;
  border: 2px solid #e2e8f0;
  border-radius: var(--radius);
  font-size: 0.9rem;
  transition: all 0.3s ease;
  background: white;
}

.form-group input:focus,
.form-group select:focus {
  outline: none;
  border-color: var(--accent);
  box-shadow: 0 0 0 3px rgba(26, 115, 232, 0.1);
}

.distance-display {
  background: var(--bg-light);
  border: 2px solid #e2e8f0;
  border-radius: var(--radius);
  padding: 0.75rem;
  text-align: center;
}

.distance-value {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--primary);
  display: block;
  margin-bottom: 0.25rem;
}

.distance-display small {
  color: var(--text-light);
  font-size: 0.8rem;
}

.time-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.checkbox-label {
  display: flex !important;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  margin-bottom: 0.5rem !important;
}

.checkbox-label input[type="checkbox"] {
  display: none;
}

.checkmark {
  width: 20px;
  height: 20px;
  border: 2px solid #e2e8f0;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  font-size: 0.8rem;
  color: transparent;
}

.checkbox-label input[type="checkbox"]:checked + .checkmark {
  background: linear-gradient(135deg, var(--primary), var(--accent));
  border-color: var(--accent);
  color: white;
}

.form-group small {
  display: block;
  color: var(--text-light);
  font-size: 0.8rem;
  margin-top: 0.25rem;
}

/* Cards do Veículo e Motorista Atuais */
.current-vehicle,
.current-driver {
  margin-bottom: 1.5rem;
}

.current-vehicle h4,
.current-driver h4 {
  color: var(--primary);
  margin-bottom: 0.75rem;
  font-size: 1rem;
  font-weight: 600;
}

.vehicle-card,
.driver-card {
  background: var(--bg-light);
  border: 2px solid #e2e8f0;
  border-radius: var(--radius);
  padding: 1rem;
}

.vehicle-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.vehicle-model {
  font-weight: 600;
  color: var(--text);
}

.vehicle-plate {
  background: var(--primary);
  color: white;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: 600;
}

.vehicle-details {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.vehicle-seats {
  color: var(--text-light);
  font-size: 0.9rem;
}

.vehicle-status {
  padding: 0.25rem 0.5rem;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: 500;
}

.vehicle-status.disponível {
  background: var(--success);
  color: white;
}

.driver-card {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.driver-avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  overflow: hidden;
  border: 2px solid var(--accent);
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
  font-size: 1rem;
}

.driver-name {
  font-weight: 600;
  color: var(--text);
  margin-bottom: 0.25rem;
}

.driver-details {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  color: var(--text-light);
  font-size: 0.9rem;
}

.change-options {
  border-top: 1px solid #e2e8f0;
  padding-top: 1.5rem;
}

/* Responsivo */
@media (max-width: 768px) {
  .first-form-edit-route {
    padding: 1rem;
  }
  
  .form-grid {
    grid-template-columns: 1fr;
  }
  
  .time-grid {
    grid-template-columns: 1fr;
  }
  
  .vehicle-header {
    flex-direction: column;
    gap: 0.5rem;
    align-items: flex-start;
  }
  
  .vehicle-details {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .driver-card {
    flex-direction: column;
    text-align: center;
  }
}
</style>