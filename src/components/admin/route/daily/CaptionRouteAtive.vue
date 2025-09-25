<template>
  <!-- Renderiza só depois que os dados estiverem carregados -->
  <div v-if="!loading && routeData"
       class="bottom-sheet"
       :style="{ height: sheetHeight + 'px' }"
       @touchstart="onTouchStart"
       @touchmove.passive="false"
       @touchmove="onTouchMove"
       @touchend="onTouchEnd">

    <div class="drag-handle"></div>

    <div class="content">
      <div class="route-header">
        <h2 class="route-title">{{ routeData.name }}</h2>
        <div class="route-status" :class="getStatusClass()">
          {{ getStatusText() }}
        </div>
      </div>

      <!-- Toggle andando/parado -->
      <div class="driving-toggle-container">
        <div class="driving-toggle-wrapper">
          <span class="toggle-label" :class="{ active: !isDriving }">Parado</span>
          <div 
            class="driving-toggle" 
            :class="{ active: isDriving }"
            @click="toggleDriving"
          >
            <div class="toggle-slider" :class="{ active: isDriving }"></div>
          </div>
          <span class="toggle-label" :class="{ active: isDriving }">Andando</span>
        </div>
      </div>

      <!-- Infos da rota -->
      <div class="route-info">
        <div class="time-section">
          <div class="time-item">
            <div class="time-label">Saída</div>
            <div class="time-value">{{ routeData.init_hour }}</div>
          </div>
          <div class="time-divider">
            <div class="route-line"></div>
            <div class="route-duration">{{ getDurationText() }}</div>
          </div>
          <div class="time-item">
            <div class="time-label">Chegada</div>
            <div class="time-value">{{ routeData.end_hour }}</div>
          </div>
        </div>

        <div class="location-section">
          <div class="location-item">
            <div class="location-icon origin">📍</div>
            <div class="location-text">
              <div class="location-label">Origem</div>
              <div class="location-address">{{ getShortAddress(routeData.origin) }}</div>
            </div>
          </div>
          
          <div class="location-item">
            <div class="location-icon destination">🎯</div>
            <div class="location-text">
              <div class="location-label">Destino</div>
              <div class="location-address">{{ getShortAddress(routeData.destination) }}</div>
            </div>
          </div>
        </div>

        <div class="route-stats">
          <div class="stat-item">
            <span class="stat-value">{{ formatDistance(routeData.distance) }}</span>
            <span class="stat-label">Distância</span>
          </div>
          <div class="stat-item">
            <span class="stat-value">{{ routeData?.passengers?.length }}</span>
            <span class="stat-label">Passageiros</span>
          </div>
          <div class="stat-item">
            <span class="stat-value">{{ getPickedUpCount() }}/{{ routeData?.passengers?.length }}</span>
            <span class="stat-label">Embarcados</span>
          </div>
        </div>
      </div>

      <!-- Lista de passageiros -->
      <div v-if="sheetHeight === maxHeight" class="passengers-section">
        <div class="passengers-header">
          <h3>Lista de Passageiros</h3>
          <div class="progress-indicator">
            {{ getPickedUpCount() }} de {{ routeData?.passengers?.length }} embarcados
          </div>
        </div>
<div class="passengers-list">
  <div 
    v-for="(passenger, index) in routeData.presences" 
    :key="passenger.id"
    class="passenger-item"
    :class="{ 'picked-up': passenger.status === 'PRESENTE' }"
  >
    <div class="passenger-checkbox">
      <input 
        type="checkbox" 
        :id="`passenger-${passenger.id}`"
      
        :checked="passenger.status === 'PRESENTE'"
      >
      <label :for="`passenger-${passenger.id}`" class="checkbox-custom"></label>
    </div>
    
    <div class="passenger-info">
      <div class="passenger-name">{{ passenger.passenger_name }}</div>
      <div class="passenger-address">
        {{ passenger.address_passenger?.[0]?.address || 'Sem endereço' }}
      </div>
    </div>
    
    <div class="passenger-order">
      #{{ index + 1 }}
    </div>
  </div>
</div>
        <div class="vehicle-section">
          <h4>Informações do Veículo</h4>
          <div class="vehicle-info">
            <div class="vehicle-details">
              <div class="vehicle-model">{{ routeData.vehicle.model }}</div>
              <div class="vehicle-plate">{{ routeData.vehicle.plate }}</div>
              <div class="vehicle-capacity">{{ routeData.vehicle.seats }} assentos</div>
            </div>
            <div class="driver-info">
              <div class="driver-name">{{ routeData.driver.user.name }}</div>
              <div class="driver-contact">{{ routeData.driver.user.telephone }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div v-else class="loading-msg">
    Carregando rota...
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue"
import { useGoRoutesStore } from "@/stores"

const goRoutesStore = useGoRoutesStore()

// Estado
const isDragging = ref(false)
const startY = ref(0)
const sheetHeight = ref(300)
const minHeight = 300
const maxHeight = window.innerHeight * 0.8
const routeData = ref(null)
const loading = ref(true)

const isDriving = ref(false)
const currentPassengerIndex = ref(0)

onMounted(async () => {
  // Pega a rota do motorista
  await goRoutesStore.takeMyDailyRoute()

  const data = Array.isArray(goRoutesStore.state.myActiveRoute)
    ? goRoutesStore.state.myActiveRoute[0]
    : goRoutesStore.state.myActiveRoute

  console.log(data.presences) // ver quem está presente ou não

  // Nenhuma propriedade local extra necessária, usamos "status"
  routeData.value = data
  loading.value = false
})

// Drag do bottom sheet
const onTouchStart = (e) => {
  isDragging.value = true
  startY.value = e.touches[0].clientY
}

const onTouchMove = (e) => {
  if (!isDragging.value) return
  e.preventDefault()
  const delta = startY.value - e.touches[0].clientY
  let newHeight = sheetHeight.value + delta
  if (newHeight < minHeight) newHeight = minHeight
  if (newHeight > maxHeight) newHeight = maxHeight
  sheetHeight.value = newHeight
  startY.value = e.touches[0].clientY
}

const onTouchEnd = () => {
  isDragging.value = false
  const middle = (minHeight + maxHeight) / 2
  sheetHeight.value = sheetHeight.value >= middle ? maxHeight : minHeight
}

const toggleDriving = () => {
  isDriving.value = !isDriving.value
  if (isDriving.value) {
    const nextUnpickedIndex = routeData.value.passengers.findIndex(p => !p.pickedUp)
    currentPassengerIndex.value = nextUnpickedIndex >= 0 ? nextUnpickedIndex : 0
  }
}

// Utils
const getShortAddress = (address) => address?.split(",").slice(0, 2).join(",") || ""
const formatDistance = (distance) => distance ? (distance / 1000).toFixed(1) + " km" : ""
const getDurationText = () => {
  if (!routeData.value?.init_hour || !routeData.value?.end_hour) return ""
  const [startHour, startMin] = routeData.value.init_hour.split(":").map(Number)
  const [endHour, endMin] = routeData.value.end_hour.split(":").map(Number)
  const duration = (endHour * 60 + endMin) - (startHour * 60 + startMin)
  return `${duration} min`
}
const getPickedUpCount = () => routeData.value?.passengers?.filter(p => p.pickedUp).length || 0
const getStatusClass = () => {
  if (!routeData.value) return ""
  const now = new Date()
  const currentTime = now.getHours() + ":" + now.getMinutes().toString().padStart(2, "0")
  if (currentTime < routeData.value.init_hour) return "pending"
  if (currentTime > routeData.value.end_hour) return "completed"
  return "in-progress"
}
const getStatusText = () => {
  switch (getStatusClass()) {
    case "pending": return "Aguardando"
    case "in-progress": return "Em andamento"
    case "completed": return "Concluída"
    default: return "Indefinido"
  }
}

</script>


<style scoped>
.bottom-sheet {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background: #fff;
  border-radius: 16px 16px 0 0;
  box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.15);
  transition: height 0.3s ease;
  overflow-y: auto;
  z-index: 1000;
}

.drag-handle {
  width: 40px;
  height: 5px;
  background: #d1d5db;
  border-radius: 3px;
  margin: 8px auto;
  cursor: grab;
}

.content {
  padding: 0 16px 16px 16px;
}

.route-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.route-title {
  font-size: 20px;
  font-weight: 600;
  color: #111827;
  margin: 0;
}

.route-status {
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
}

.route-status.pending {
  background: #fef3c7;
  color: #d97706;
}

.route-status.in-progress {
  background: #dcfce7;
  color: #16a34a;
}

.route-status.completed {
  background: #e5e7eb;
  color: #6b7280;
}

/* Estilos do Toggle Deslizante */
.driving-toggle-container {
  margin-bottom: 20px;
  padding: 16px;
  background: #f8fafc;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
}

.driving-toggle-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
}

.toggle-label {
  font-size: 14px;
  font-weight: 500;
  color: #64748b;
  transition: color 0.2s ease;
}

.toggle-label.active {
  color: #1e293b;
}

.driving-toggle {
  position: relative;
  width: 60px;
  height: 32px;
  background: #e2e8f0;
  border-radius: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.driving-toggle.active {
  background: #10b981;
}

.toggle-slider {
  position: absolute;
  top: 2px;
  left: 2px;
  width: 28px;
  height: 28px;
  background: white;
  border-radius: 50%;
  transition: transform 0.3s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.toggle-slider.active {
  transform: translateX(28px);
}

/* Seção do Passageiro Atual */
.current-passenger-section {
  margin-bottom: 20px;
  padding: 16px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 16px;
  color: white;
}

.current-passenger-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.current-passenger-header h3 {
  font-size: 16px;
  font-weight: 600;
  margin: 0;
  color: white;
}

.passenger-progress {
  font-size: 12px;
  opacity: 0.8;
}

.passenger-navigation {
  display: flex;
  align-items: center;
  gap: 12px;
}

.nav-button {
  width: 40px;
  height: 40px;
  border: none;
  background: rgba(255, 255, 255, 0.2);
  color: white;
  border-radius: 50%;
  font-size: 18px;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.nav-button:hover:not(:disabled) {
  background: rgba(255, 255, 255, 0.3);
  transform: scale(1.05);
}

.nav-button:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.current-passenger-card {
  flex: 1;
  display: flex;
  align-items: center;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 12px;
  backdrop-filter: blur(10px);
}

.passenger-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 16px;
  margin-right: 12px;
}

.passenger-details {
  flex: 1;
}

.passenger-details .passenger-name {
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 2px;
}

.passenger-details .passenger-address {
  font-size: 12px;
  opacity: 0.8;
  margin-bottom: 4px;
}

.passenger-status {
  font-size: 11px;
  padding: 2px 6px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  display: inline-block;
}

.passenger-status.picked {
  background: rgba(16, 185, 129, 0.3);
}

.pickup-button {
  width: 36px;
  height: 36px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  background: transparent;
  color: white;
  border-radius: 50%;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.align-dflex{
  display: flex;
  flex-direction: column;
  gap: .5rem;
}

.pickup-button.picked {
  background: #10b981;
  border-color: #10b981;
}

.pickup-button:hover {
  transform: scale(1.1);
}

.time-section {
  display: flex;
  align-items: center;
  margin-bottom: 16px;
  background: #f9fafb;
  padding: 16px;
  border-radius: 12px;
}

.time-item {
  text-align: center;
}

.time-label {
  font-size: 12px;
  color: #6b7280;
  margin-bottom: 4px;
}

.time-value {
  font-size: 18px;
  font-weight: 600;
  color: #111827;
}

.time-divider {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 16px;
}

.route-line {
  width: 100%;
  height: 2px;
  background: #e5e7eb;
  border-radius: 1px;
  margin-bottom: 4px;
}

.route-duration {
  font-size: 12px;
  color: #6b7280;
}

.location-section {
  margin-bottom: 16px;
}

.location-item {
  display: flex;
  align-items: center;
  margin-bottom: 12px;
}

.location-item:last-child {
  margin-bottom: 0;
}

.location-icon {
  font-size: 16px;
  margin-right: 12px;
  width: 24px;
}

.location-text {
  flex: 1;
}

.location-label {
  font-size: 12px;
  color: #6b7280;
  margin-bottom: 2px;
}

.location-address {
  font-size: 14px;
  color: #111827;
  font-weight: 500;
}

.route-stats {
  display: flex;
  justify-content: space-around;
  background: #f3f4f6;
  padding: 16px;
  border-radius: 12px;
  margin-bottom: 16px;
}

.stat-item {
  text-align: center;
}

.stat-value {
  display: block;
  font-size: 18px;
  font-weight: 600;
  color: #111827;
  margin-bottom: 4px;
}

.stat-label {
  font-size: 12px;
  color: #6b7280;
}

.passengers-section {
  border-top: 1px solid #e5e7eb;
  padding-top: 16px;
}

.passengers-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.passengers-header h3 {
  font-size: 16px;
  font-weight: 600;
  margin: 0;
}

.progress-indicator {
  font-size: 12px;
  color: #6b7280;
}

.passengers-list {
  max-height: 300px;
  overflow-y: auto;
}

.passenger-item {
  display: flex;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid #f3f4f6;
  transition: background-color 0.2s;
  position: relative;
}

.passenger-item:last-child {
  border-bottom: none;
}

.passenger-item.picked-up {
  background: #f0fdf4;
}

.passenger-item.current {
  background: #eff6ff;
  border-left: 4px solid #3b82f6;
  padding-left: 8px;
}

.current-indicator {
  margin-left: 8px;
  font-size: 14px;
}

.passenger-checkbox {
  margin-right: 12px;
  position: relative;
}

.passenger-checkbox input[type="checkbox"] {
  opacity: 0;
  position: absolute;
  width: 20px;
  height: 20px;
}

.checkbox-custom {
  display: inline-block;
  width: 20px;
  height: 20px;
  border: 2px solid #d1d5db;
  border-radius: 4px;
  cursor: pointer;
  position: relative;
  transition: all 0.2s;
}

.passenger-checkbox input[type="checkbox"]:checked + .checkbox-custom {
  background: #10b981;
  border-color: #10b981;
}

.passenger-checkbox input[type="checkbox"]:checked + .checkbox-custom::after {
  content: '✓';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  font-size: 12px;
  font-weight: bold;
}

.passenger-info {
  flex: 1;
}

.passenger-name {
  font-size: 14px;
  font-weight: 500;
  color: #111827;
  margin-bottom: 2px;
}

.passenger-address {
  font-size: 12px;
}

.passenger-order {
  font-size: 12px;
  color: #9ca3af;
  font-weight: 500;
}

.vehicle-section {
  border-top: 1px solid #e5e7eb;
  padding-top: 16px;
  margin-top: 16px;
}

.vehicle-section h4 {
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 12px;
  color: #111827;
}

.vehicle-info {
  display: flex;
  justify-content: space-between;
  background: #f9fafb;
  padding: 12px;
  border-radius: 8px;
}

.vehicle-details, .driver-info {
  flex: 1;
}

.vehicle-model, .driver-name {
  font-size: 14px;
  font-weight: 500;
  color: #111827;
  margin-bottom: 4px;
}

.vehicle-plate, .vehicle-capacity, .driver-contact {
  font-size: 12px;
  color: #6b7280;
}

.loading-msg {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  font-size: 16px;
  color: #6b7280;
}
</style>