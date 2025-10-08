<script setup>
import { ref, computed, onMounted, watch } from "vue"
import { useGoRoutesStore, useAuthStore } from '@/stores'
import MapMarker from 'vue-material-design-icons/MapMarker.vue'
import Phone from 'vue-material-design-icons/Phone.vue'
import ClockOutline from 'vue-material-design-icons/ClockOutline.vue'

const goRoutesStore = useGoRoutesStore()
const authStore = useAuthStore()

const routeData = computed(() => goRoutesStore.state.myPassengerOpenedRoute)

const currentPassenger = computed(() => {
  if (!routeData.value?.presences) return null
  const passengerId = authStore.state.user.passenger_data?.id
  return routeData.value.presences.find(p => p.passenger_route === passengerId)
})

const getDriverLocation = computed(() => {
  const driver = routeData.value?.driver
  if (!driver) return null
  
  const location = driver.user?.my_location || driver.my_location
  
  if (!location) return null
  
  if (typeof location === 'object' && location.lat !== undefined && location.lng !== undefined) {
    return {
      lat: parseFloat(location.lat),
      lng: parseFloat(location.lng)
    }
  }
  
  if (typeof location === 'object' && location.latitude !== undefined && location.longitude !== undefined) {
    return {
      lat: parseFloat(location.latitude),
      lng: parseFloat(location.longitude)
    }
  }
  
  return null
})

const mapCenter = computed(() => {
  const driverLocation = getDriverLocation.value
  if (driverLocation) {
    return driverLocation
  }
  return { 
    lat: routeData.value?.latitude_origin || -26.2743, 
    lng: routeData.value?.longitude_origin || -48.8215 
  }
})

const mapZoom = ref(12)


const createCircularIcon = (imageUrl) => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  const size = 60;

  canvas.width = size;
  canvas.height = size;

  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';

    img.onload = () => {
      ctx.beginPath();
      ctx.arc(size / 2, size / 2, size / 2, 0, 2 * Math.PI);
      ctx.fillStyle = '#ffffff';
      ctx.fill();
      ctx.lineWidth = 3;
      ctx.strokeStyle = '#1a73e8';
      ctx.stroke();

      ctx.save();
      ctx.beginPath();
      ctx.arc(size / 2, size / 2, (size / 2) - 2, 0, 2 * Math.PI);
      ctx.clip();
      ctx.drawImage(img, 0, 0, size, size);
      ctx.restore();

      resolve(canvas.toDataURL());
    };

    img.onerror = () => {
      resolve("https://cdn-icons-png.flaticon.com/512/744/744465.png");
    };

    img.src = imageUrl;
  });
};

const markers = ref([]);

watch(() => routeData.value, async (newRouteData) => {
  if (!newRouteData) {
    markers.value = [];
    return;
  }

  const driverLocation = getDriverLocation.value;
  const markersArray = [];

  // Marcador do motorista
  if (driverLocation) {
    const driver = newRouteData.driver;
    let iconUrl = "https://cdn-icons-png.flaticon.com/512/744/744465.png";
    
    if (driver?.user?.picture?.file) {
      try {
        iconUrl = await createCircularIcon(driver.user.picture.file);
      } catch (error) {
        console.error('Erro ao criar ícone do motorista:', error);
      }
    }

    markersArray.push({
      position: driverLocation,
      title: driver.user?.name || 'Motorista',
      icon: {
        url: iconUrl,
        scaledSize: { width: 60, height: 60 },
        anchor: { x: 30, y: 30 }
      }
    });
  }

  markers.value = markersArray;
}, { immediate: true, deep: true });

const sheetHeight = ref(300);
const minHeight = 300;
const maxHeight = window.innerHeight * 0.75;
const isDragging = ref(false);
const startY = ref(300);
const returnTime = ref(null);

const onTouchStart = e => { 
  isDragging.value = true;
  startY.value = e.touches[0].clientY;
};

const onTouchMove = e => {
  if (!isDragging.value) return;
  e.preventDefault();
  const delta = startY.value - e.touches[0].clientY;
  let newHeight = sheetHeight.value + delta;
  if (newHeight < minHeight) newHeight = minHeight;
  if (newHeight > maxHeight) newHeight = maxHeight;
  sheetHeight.value = newHeight;
  startY.value = e.touches[0].clientY;
};

const onTouchEnd = () => { 
  isDragging.value = false;
  const middle = (minHeight + maxHeight)/2;
  sheetHeight.value = sheetHeight.value >= middle ? maxHeight : minHeight;
};

const selectReturnTime = (time) => {
  returnTime.value = time;
};

const getStatusInfo = () => {
  if (!routeData.value) {
    return { text: "Carregando...", color: "#94a3b8", icon: "⏳" };
  }
  
  if (routeData.value.finalized) {
    return { text: "Finalizada", color: "#64748b", icon: "✓" };
  } else if (routeData.value.is_active) {
    return { text: "Em Andamento", color: "#4CAF50", icon: "🚌" };
  } else {
    return { text: "Aguardando", color: "#FF9800", icon: "⏰" };
  }
};

const myPickupAddress = computed(() => {
  return currentPassenger.value?.address_passenger?.[0]?.address || "Endereço não disponível";
});

// Carrega a rota quando o componente é montado
onMounted(async () => {
  const passengerId = authStore.state.user.passenger_data?.id;
  if (passengerId) {
    await goRoutesStore.filterMyOpenedPassengerRoute(passengerId);
  }
});
</script>

<template>
  <div class="passenger-view" v-if="routeData">
    <div class="map-container">
      <GMapMap
        :center="mapCenter"
        :zoom="mapZoom"
        map-type-id="roadmap"
        style="width: 100%; height: 100vh"
        :options="{
          zoomControl: true,
          mapTypeControl: false,
          scaleControl: true,
          streetViewControl: false,
          rotateControl: false,
          fullscreenControl: true,
          styles: [
            {
              featureType: 'poi',
              elementType: 'labels',
              stylers: [{ visibility: 'off' }]
            }
          ]
        }"
      >
        <!-- Marcadores -->
        <GMapMarker
          v-for="(marker, index) in markers"
          :key="index"
          :position="marker.position"
          :title="marker.title"
          :icon="marker.icon"
          :clickable="true"
        />

      </GMapMap>
    </div>

    <!-- Bottom sheet -->
    <div 
      class="bottom-sheet"
      :style="{ height: sheetHeight + 'px' }"
      @touchstart="onTouchStart"
      @touchmove.prevent="onTouchMove"
      @touchend="onTouchEnd"
    >
      <div class="drag-handle-container">
        <div class="drag-handle"></div>
      </div>

      <div class="sheet-content">
        <div class="status-banner" :style="{ background: getStatusInfo().color }">
          <span class="status-icon">{{ getStatusInfo().icon }}</span>
          <div class="status-text">
            <span class="status-label">Status da Rota</span>
            <span class="status-value">{{ getStatusInfo().text }}</span>
          </div>
        </div>

        <div class="my-info-card">
          <div class="card-header">
            <h3>📍 Meu Embarque</h3>
            <div class="time-badge">{{ routeData.init_hour }}</div>
          </div>
          <div class="pickup-address">
            <MapMarker :size="18" />
            <span>{{ myPickupAddress }}</span>
          </div>
        </div>

        <div v-if="sheetHeight >= maxHeight" class="expanded-content">
          <div class="section-divider"></div>

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
                🕛 <span>12:00</span>
              </button>

              <button 
                class="return-btn"
                :class="{ selected: returnTime === '17:00' }"
                @click="selectReturnTime('17:00')"
              >
                🕔 <span>17:00</span>
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
            <div class="driver-card">
              <div class="driver-avatar">
                <img :src="routeData.driver?.user?.picture?.file" :alt="routeData.driver?.user?.name" />
              </div>
              <div class="driver-details">
                <span class="driver-name">{{ routeData.driver?.user?.name }}</span>
                <span class="driver-phone">
                  <Phone :size="14" /> {{ routeData.driver?.user?.telephone }}
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>

  <div v-else class="no-route-container">
    <div class="no-route-content">
      <div class="no-route-icon">🚌</div>
      <h3>Nenhuma rota ativa</h3>
      <p>Você não possui rotas em andamento no momento</p>
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

/* Seção Informar Volta */
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

/* Motorista */
.driver-info h4 {
  font-size: 1rem;
  font-weight: 600;
  color: var(--primary);
  margin: 0 0 1rem 0;
}

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

.no-route-container {
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
}

.no-route-content {
  text-align: center;
  padding: 2rem;
}

.no-route-icon {
  font-size: 4rem;
  margin-bottom: 1rem;
  opacity: 0.7;
}

.no-route-content h3 {
  color: var(--primary);
  margin-bottom: 0.5rem;
  font-weight: 600;
}

.no-route-content p {
  color: #64748b;
  margin: 0;
}
</style>