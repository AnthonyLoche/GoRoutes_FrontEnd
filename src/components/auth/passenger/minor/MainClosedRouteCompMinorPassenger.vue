<script setup>
import { ref, computed } from "vue"
import MapMarker from 'vue-material-design-icons/MapMarker.vue'
import Bus from 'vue-material-design-icons/Bus.vue'
import Phone from 'vue-material-design-icons/Phone.vue'
import ClockOutline from 'vue-material-design-icons/ClockOutline.vue'

const routeData = ref({
  id: 10,
  name: "Rota Sul",
  status: "FINALIZADA",
  myPickupAddress: "Rua: Polonia, 725, Iririú, Joinville, SC",
  myPickupTime: "07:15",
  driver: {
    name: "Alexander",
    telephone: "(11) 99999-8828",
    photo: "https://res.cloudinary.com/dntccyy7i/image/upload/v1759345536/profiles/l5qv7sjnrzvv3sce0f9m"
  },
})

const mapCenter = ref({ lat: -26.2743, lng: -48.8215 })
const mapZoom = ref(12)

const isRouteFinished = computed(() => routeData.value.status === "FINALIZADA")

const markers = ref([
  {
    position: { lat: -26.2743, lng: -48.8215 },
    title: 'Meu Embarque',
    icon: {
      path: 'M 0,0 A 10,10 0 1,1 0,-0.01 z',
      fillColor: isRouteFinished.value ? '#64748b' : '#1a73e8',
      fillOpacity: 1,
      strokeColor: '#ffffff',
      strokeWeight: 3,
      scale: 2
    }
  }
])

// Nova variável para controlar o horário de volta selecionado
const returnTime = ref(null)

// Função para selecionar o horário de volta
const selectReturnTime = (time) => {
  returnTime.value = time
}

// Estilos do mapa para quando estiver inativo
const inactiveMapStyles = [
  {
    "elementType": "geometry",
    "stylers": [{ "color": "#f5f5f5" }]
  },
  {
    "elementType": "labels.icon",
    "stylers": [{ "visibility": "off" }]
  },
  {
    "elementType": "labels.text.fill",
    "stylers": [{ "color": "#616161" }]
  },
  {
    "elementType": "labels.text.stroke",
    "stylers": [{ "color": "#f5f5f5" }]
  },
  {
    "featureType": "administrative.land_parcel",
    "elementType": "labels.text.fill",
    "stylers": [{ "color": "#bdbdbd" }]
  },
  {
    "featureType": "poi",
    "elementType": "geometry",
    "stylers": [{ "color": "#eeeeee" }]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.fill",
    "stylers": [{ "color": "#757575" }]
  },
  {
    "featureType": "poi.park",
    "elementType": "geometry",
    "stylers": [{ "color": "#e5e5e5" }]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text.fill",
    "stylers": [{ "color": "#9e9e9e" }]
  },
  {
    "featureType": "road",
    "elementType": "geometry",
    "stylers": [{ "color": "#ffffff" }]
  },
  {
    "featureType": "road.arterial",
    "elementType": "labels.text.fill",
    "stylers": [{ "color": "#757575" }]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [{ "color": "#dadada" }]
  },
  {
    "featureType": "road.highway",
    "elementType": "labels.text.fill",
    "stylers": [{ "color": "#616161" }]
  },
  {
    "featureType": "road.local",
    "elementType": "labels.text.fill",
    "stylers": [{ "color": "#9e9e9e" }]
  },
  {
    "featureType": "transit.line",
    "elementType": "geometry",
    "stylers": [{ "color": "#e5e5e5" }]
  },
  {
    "featureType": "transit.station",
    "elementType": "geometry",
    "stylers": [{ "color": "#eeeeee" }]
  },
  {
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [{ "color": "#c9c9c9" }]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.fill",
    "stylers": [{ "color": "#9e9e9e" }]
  }
]

const normalMapStyles = [
  {
    featureType: 'poi',
    elementType: 'labels',
    stylers: [{ visibility: 'off' }]
  }
]

const mapStyles = computed(() => {
  return isRouteFinished.value ? inactiveMapStyles : normalMapStyles
})

const sheetHeight = ref(300)
const minHeight = 300
const maxHeight = window.innerHeight * 0.75 // Aumentei para acomodar a nova seção
const isDragging = ref(false)
const startY = ref(300)

const onTouchStart = e => { 
  isDragging.value = true
  startY.value = e.touches[0].clientY
}

const onTouchMove = e => {
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
  const middle = (minHeight + maxHeight)/2
  sheetHeight.value = sheetHeight.value >= middle ? maxHeight : minHeight
}

const getStatusInfo = () => {
  switch(routeData.value.status) {
    case "AGUARDANDO":
      return { text: "Aguardando Início", color: "#FF9800", icon: "⏰" }
    case "EM_ANDAMENTO":
      return { text: "Em Andamento", color: "#4CAF50", icon: "🚌" }
    case "FINALIZADA":
      return { text: "Finalizada", color: "#64748b", icon: "✓" }
    default:
      return { text: "Indefinido", color: "#94a3b8", icon: "❓" }
  }
}
</script>

<template>
  <div class="passenger-view" :class="{ 'route-finished': isRouteFinished }">
    <div class="map-container">
      <GMapMap
        :center="mapCenter"
        :zoom="mapZoom"
        map-type-id="roadmap"
        style="width: 100%; height: 100vh"
        :options="{
          zoomControl: !isRouteFinished,
          mapTypeControl: false,
          scaleControl: !isRouteFinished,
          streetViewControl: false,
          rotateControl: false,
          fullscreenControl: !isRouteFinished,
          draggable: !isRouteFinished,
          zoomControl: !isRouteFinished,
          scrollwheel: !isRouteFinished,
          disableDoubleClickZoom: isRouteFinished,
          styles: mapStyles
        }"
      >
        <GMapMarker
          v-for="(marker, index) in markers"
          :key="index"
          :position="marker.position"
          :title="marker.title"
          :icon="marker.icon"
          :clickable="!isRouteFinished"
        />
      </GMapMap>

      <div class="map-overlay-info">
        <div class="route-name-badge" :class="{ 'finished-badge': isRouteFinished }">
          <Bus :size="16" />
          <span>{{ routeData.name }}</span>
        </div>
      </div>

      <div v-if="isRouteFinished" class="map-inactive-overlay">
        <div class="inactive-message">
          <div class="inactive-icon">🗺️</div>
          <h3>Rota Finalizada</h3>
          <p>Esta rota já foi concluída</p>
        </div>
      </div>
    </div>

    <div 
      class="bottom-sheet"
      :style="{ height: sheetHeight + 'px' }"
      @touchstart="onTouchStart"
      @touchmove.prevent="onTouchMove"
      @touchend="onTouchEnd"
    >
      <div class="drag-handle-container">
        <div class="drag-handle" :class="{ 'finished-handle': isRouteFinished }"></div>
      </div>

      <div class="sheet-content">
        <div class="status-banner" :style="{ background: getStatusInfo().color }">
          <span class="status-icon">{{ getStatusInfo().icon }}</span>
          <div class="status-text">
            <span class="status-label">Status da Rota</span>
            <span class="status-value">{{ getStatusInfo().text }}</span>
          </div>
        </div>

        <div class="my-info-card" :class="{ 'finished-card': isRouteFinished }">
          <div class="card-header">
            <h3>📍 Meu Embarque</h3>
            <div class="time-badge" :class="{ 'finished-time': isRouteFinished }">
              {{ routeData.myPickupTime }}
            </div>
          </div>
          <div class="pickup-address">
            <MapMarker :size="18" />
            <span>{{ routeData.myPickupAddress }}</span>
          </div>
        </div>

        <div v-if="sheetHeight >= maxHeight" class="expanded-content">          
          <div class="section-divider"></div>

          <!-- Nova seção: Informar Volta -->
          <div class="return-time-section">
            <div class="return-header">
              <ClockOutline :size="20" />
              <h4>Informar Volta</h4>
            </div>
            <p class="return-description">Selecione o horário que você deseja retornar</p>
            
            <div class="return-time-buttons">
              <button 
                class="return-btn"
                :class="{ selected: returnTime === '12:00' }"
                @click="selectReturnTime('12:00')"
              >
                <span class="return-emoji">🕛</span>
                <span class="return-time">12:00</span>
                <span class="return-label">Meio-dia</span>
              </button>

              <button 
                class="return-btn"
                :class="{ selected: returnTime === '17:00' }"
                @click="selectReturnTime('17:00')"
              >
                <span class="return-emoji">🕔</span>
                <span class="return-time">17:00</span>
                <span class="return-label">Tarde</span>
              </button>
            </div>

            <div v-if="returnTime" class="return-confirmation">
              <span class="confirmation-icon">✓</span>
              <span class="confirmation-text">Volta confirmada para às {{ returnTime }}</span>
            </div>
          </div>

          <div class="section-divider"></div>

          <div class="driver-info">
            <h4>Motorista</h4>
            <div class="driver-card" :class="{ 'finished-driver': isRouteFinished }">
              <div class="driver-avatar" :class="{ 'finished-avatar': isRouteFinished }">
                <img :src="routeData.driver.photo" :alt="routeData.driver.name" />
              </div>
              <div class="driver-details">
                <span class="driver-name">{{ routeData.driver.name }}</span>
                <span class="driver-phone">
                  <Phone :size="14" />
                  {{ routeData.driver.telephone }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.passenger-view {
  --primary: #022840;
  --accent: #1a73e8;
  --gradient-primary: linear-gradient(135deg, #022840, #1a73e8);
  width: 100%;
  height: 100vh;
  position: relative;
  overflow: hidden;
  font-family: 'Poppins', -apple-system, BlinkMacSystemFont, sans-serif;
}

/* Container do Mapa */
.map-container {
  width: 100%;
  height: 100vh;
  position: relative;
}

/* Overlay de informações no mapa */
.map-overlay-info {
  position: absolute;
  top: 20px;
  left: 20px;
  z-index: 10;
}

.route-name-badge {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 0.7rem 1.2rem;
  font-weight: 600;
  font-size: 0.9rem;
  color: var(--primary);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.8);
}

.route-name-badge svg {
  color: var(--accent);
}

/* Botão flutuante */
.floating-action {
  position: absolute;
  top: 20px;
  right: 20px;
  z-index: 10;
}

.maps-button {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  background: white;
  border: none;
  border-radius: 25px;
  padding: 0.8rem 1.3rem;
  font-weight: 600;
  font-size: 0.9rem;
  color: var(--primary);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
  cursor: pointer;
  transition: all 0.3s ease;
}

.maps-button:active {
  transform: scale(0.95);
}

.maps-button svg {
  color: var(--accent);
}

/* Bottom Sheet */
.bottom-sheet {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background: white;
  border-radius: 24px 24px 0 0;
  box-shadow: 0 -6px 30px rgba(0, 0, 0, 0.15);
  transition: height 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
  z-index: 1000;
}

.drag-handle-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0.8rem;
  cursor: grab;
}

.drag-handle-container:active {
  cursor: grabbing;
}

.drag-handle {
  width: 50px;
  height: 5px;
  background: #d1d5db;
  border-radius: 10px;
  margin-bottom: 0.5rem;
}

.drag-icon {
  color: #9ca3af;
}

.sheet-content {
  padding: 0 1.5rem 2rem 1.5rem;
  overflow-y: auto;
  max-height: calc(75vh - 60px);
}

/* Status Banner */
.status-banner {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 1.2rem;
  border-radius: 14px;
  margin-bottom: 1.2rem;
  color: white;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
}

.status-icon {
  font-size: 2rem;
  flex-shrink: 0;
}

.status-text {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.status-label {
  font-size: 0.75rem;
  opacity: 0.9;
  font-weight: 500;
}

.status-value {
  font-size: 1.1rem;
  font-weight: 700;
}

/* Meu embarque card */
.my-info-card {
  background: linear-gradient(135deg, rgba(26, 115, 232, 0.08), rgba(2, 40, 64, 0.08));
  border: 2px solid var(--accent);
  border-radius: 14px;
  padding: 1.2rem;
  margin-bottom: 1.2rem;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.8rem;
}

.card-header h3 {
  font-size: 1.05rem;
  font-weight: 700;
  color: var(--primary);
  margin: 0;
}

.time-badge {
  padding: 0.4rem 1rem;
  background: var(--gradient-primary);
  color: white;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 700;
}

.pickup-address {
  display: flex;
  align-items: flex-start;
  gap: 0.6rem;
  color: var(--primary);
  font-size: 0.9rem;
  line-height: 1.5;
}

.pickup-address svg {
  color: var(--accent);
  flex-shrink: 0;
  margin-top: 0.2rem;
}

/* Info chips */
.quick-info {
  display: flex;
  gap: 0.8rem;
  margin-bottom: 1.2rem;
}

.info-chip {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 0.8rem;
  padding: 1rem;
  background: linear-gradient(135deg, #f8fafc, #ffffff);
  border-radius: 14px;
  border: 1px solid #e2e8f0;
}

.info-chip svg {
  color: var(--accent);
  flex-shrink: 0;
}

.chip-content {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.chip-label {
  font-size: 0.7rem;
  color: #64748b;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.chip-value {
  font-size: 0.95rem;
  font-weight: 700;
  color: var(--primary);
}

/* Conteúdo expandido */
.expanded-content {
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.section-divider {
  height: 1px;
  background: linear-gradient(90deg, transparent, #e2e8f0, transparent);
  margin: 1.2rem 0;
}

/* Detalhes da rota */
.route-details h4,
.vehicle-info h4,
.driver-info h4 {
  font-size: 1rem;
  font-weight: 600;
  color: var(--primary);
  margin: 0 0 1rem 0;
}

.detail-item {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 0.8rem;
  background: linear-gradient(135deg, #f8fafc, #ffffff);
  border-radius: 12px;
  margin-bottom: 0.5rem;
}

.detail-icon {
  width: 32px;
  height: 32px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  flex-shrink: 0;
}

.origin-icon {
  background: linear-gradient(135deg, #4CAF50, #66BB6A);
}

.destination-icon {
  background: linear-gradient(135deg, #F44336, #EF5350);
}

.detail-text {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  flex: 1;
}

.detail-label {
  font-size: 0.75rem;
  color: #64748b;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.detail-value {
  font-size: 0.9rem;
  color: var(--primary);
  font-weight: 500;
  line-height: 1.4;
}

.route-line-detail {
  width: 2px;
  height: 20px;
  background: linear-gradient(to bottom, #4CAF50, #F44336);
  margin: 0.3rem 0 0.3rem 1rem;
}

.route-stats-detail {
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
}

.stat-detail {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.3rem;
  padding: 0.8rem;
  background: linear-gradient(135deg, #f8fafc, #ffffff);
  border-radius: 12px;
}

.stat-detail-label {
  font-size: 0.75rem;
  color: #64748b;
  font-weight: 500;
}

.stat-detail-value {
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--primary);
}

/* Veículo */
.vehicle-card {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: linear-gradient(135deg, #f8fafc, #ffffff);
  border-radius: 12px;
  border: 1px solid #e2e8f0;
}

.vehicle-card svg {
  color: var(--accent);
  flex-shrink: 0;
}

.vehicle-details {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}

.vehicle-model {
  font-size: 1rem;
  font-weight: 600;
  color: var(--primary);
}

.vehicle-plate {
  font-size: 0.85rem;
  color: #64748b;
  font-weight: 500;
}

/* Motorista */
.driver-card {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: linear-gradient(135deg, #f8fafc, #ffffff);
  border-radius: 12px;
  border: 1px solid #e2e8f0;
}

.driver-avatar {
  width: 55px;
  height: 55px;
  border-radius: 50%;
  overflow: hidden;
  border: 3px solid var(--accent);
  flex-shrink: 0;
}

.driver-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.driver-details {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.driver-name {
  font-size: 1rem;
  font-weight: 600;
  color: var(--primary);
}

.driver-phone {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.85rem;
  color: #64748b;
}

.driver-phone svg {
  color: var(--accent);
}

.call-button {
  width: 45px;
  height: 45px;
  border-radius: 50%;
  background: var(--gradient-primary);
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  cursor: pointer;
  box-shadow: 0 4px 15px rgba(26, 115, 232, 0.3);
  transition: all 0.3s ease;
  flex-shrink: 0;
}

.call-button:active {
  transform: scale(0.9);
}

/* Scrollbar */
.sheet-content::-webkit-scrollbar {
  width: 6px;
}

.sheet-content::-webkit-scrollbar-track {
  background: #f1f5f9;
  border-radius: 10px;
}

.sheet-content::-webkit-scrollbar-thumb {
  background: var(--accent);
  border-radius: 10px;
}

.return-time-section {
  margin-bottom: 1rem;
}

.return-header {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  margin-bottom: 0.5rem;
}

.return-header svg {
  color: var(--accent);
}

.return-header h4 {
  font-size: 1rem;
  font-weight: 600;
  color: var(--primary);
  margin: 0;
}

.return-description {
  font-size: 0.85rem;
  color: #64748b;
  margin: 0 0 1rem 0;
  line-height: 1.4;
}

.return-time-buttons {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
}

.return-btn {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 1.2rem 1rem;
  background: linear-gradient(135deg, #f8fafc, #ffffff);
  border: 2px solid #e2e8f0;
  border-radius: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.return-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: var(--gradient-primary);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.return-btn:active {
  transform: scale(0.98);
}

.return-btn.selected {
  border-color: var(--accent);
  background: linear-gradient(135deg, rgba(26, 115, 232, 0.08), rgba(2, 40, 64, 0.08));
  box-shadow: 0 4px 15px rgba(26, 115, 232, 0.2);
}

.return-btn.selected::before {
  opacity: 0.05;
}

.return-emoji {
  font-size: 2rem;
  position: relative;
  z-index: 1;
  transition: transform 0.3s ease;
}

.return-btn.selected .return-emoji {
  transform: scale(1.1);
}

.return-time {
  font-size: 1.3rem;
  font-weight: 700;
  color: var(--primary);
  position: relative;
  z-index: 1;
}

.return-btn.selected .return-time {
  color: var(--accent);
}

.return-label {
  font-size: 0.85rem;
  color: #64748b;
  font-weight: 500;
  position: relative;
  z-index: 1;
}

.return-btn.selected .return-label {
  color: var(--primary);
  font-weight: 600;
}

/* Confirmação de volta */
.return-confirmation {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  padding: 1rem 1.2rem;
  background: linear-gradient(135deg, rgba(76, 175, 80, 0.1), rgba(76, 175, 80, 0.15));
  border: 2px solid #4CAF50;
  border-radius: 12px;
  animation: slideIn 0.4s ease;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.confirmation-icon {
  font-size: 1.5rem;
  color: #4CAF50;
}

.confirmation-text {
  font-size: 0.9rem;
  font-weight: 600;
  color: #2E7D32;
  flex: 1;
}
</style>