<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useGoRoutesStore } from '@/stores'
import HeaderRetrieveRouteComp from './HeaderRetrieveRouteComp.vue'
import RouteInfoCardsComp from './RouteInfoCardsComp.vue'
import VehicleCardComp from './VehicleCardComp.vue'
import DriverCardComp from './DriverCardComp.vue'
import AccountCircle from 'vue-material-design-icons/AccountCircle.vue'
import GoogleMaps from 'vue-material-design-icons/GoogleMaps.vue'
import MapMarker from 'vue-material-design-icons/MapMarker.vue'

const router = useRouter()
const route = useRoute()
const goRoutesStore = useGoRoutesStore()

const loading = ref(true)
const error = ref(null)

const routeId = computed(() => parseInt(route.params.id))

const routeData = computed(() => goRoutesStore.state.retrieveRoute)
const distanceKm = computed(() => routeData.value ? (routeData.value.distance / 1000).toFixed(1) : '0.0')
const occupancyPercentage = computed(() => {
  if (!routeData.value) return '0'
  return ((routeData.value.passengers?.length / routeData.value.vehicle?.seats) * 100).toFixed(0)
})

onMounted(async () => {
  if (routeId.value) {
    await loadRouteData()
  }
})

const loadRouteData = async () => {
  loading.value = true
  error.value = null
  try {
    await goRoutesStore.getRoute(routeId.value)
    if (!goRoutesStore.state.retrieveRoute) {
      error.value = 'Rota não encontrada'
    }
  } catch (err) {
    error.value = 'Erro ao carregar dados da rota'
    console.error('Erro ao carregar rota:', err)
  } finally {
    loading.value = false
  }
}

const goBack = () => {
  router.back()
}

const openGoogleMaps = () => {
  if (routeData.value?.optimized_route_url) {
    window.open(routeData.value.optimized_route_url, '_blank')
  } else {
    alert('URL do Google Maps não disponível para esta rota')
  }
}

const editRoute = () => {
  if (routeData.value?.id) {
    router.push(`/routes/edit/${routeData.value.id}`)
  }
}

const deleteRoute = async () => {
  if (confirm('Tem certeza que deseja excluir esta rota?')) {
    try {
      // Aqui você implementaria a chamada para deletar a rota
      // await GoRoutesService.deleteRoute(routeData.value.id)
      alert('Rota excluída com sucesso!')
      router.push('/routes')
    } catch (err) {
      alert('Erro ao excluir rota')
      console.error('Erro ao excluir rota:', err)
    }
  }
}

const exportRoute = () => {
  alert('Exportando relatório da rota...')
  // Implementar lógica de exportação
}
</script>

<template>
  <div class="route-details-premium">
    <div v-if="loading" class="loading-container">
      <div class="loading-spinner"></div>
      <p>Carregando dados da rota...</p>
    </div>

    <div v-else-if="error" class="error-container">
      <div class="error-icon">⚠️</div>
      <h3>Erro ao carregar rota</h3>
      <p>{{ error }}</p>
      <button class="retry-button" @click="loadRouteData">
        Tentar Novamente
      </button>
    </div>

    <div v-else-if="routeData" class="route-content">
      <HeaderRetrieveRouteComp 
        :route-data="routeData"
        title="Informações completas da rota"
        @back="goBack"
        @edit="editRoute"
        @export="exportRoute"
        @delete="deleteRoute"
      />

      <RouteInfoCardsComp 
        :route-data="routeData"
        :distance-km="distanceKm"
      />

      <div class="vehicle-driver-section" v-if="routeData.vehicle || routeData.driver">
        <VehicleCardComp 
          v-if="routeData.vehicle"
          :vehicle="routeData.vehicle"
          :occupancy-percentage="occupancyPercentage"
          :passengers-count="routeData.passengers?.length || 0"
        />

        <DriverCardComp 
          v-if="routeData.driver"
          :driver="routeData.driver"
        />
      </div>

      <div class="passengers-section" v-if="routeData.passengers?.length">
        <div class="section-header">
          <div class="header-title">
            <AccountCircle :size="28" />
            <h3>Passageiros ({{ routeData.passengers.length }})</h3>
          </div>
          <span class="passengers-count-badge">{{ routeData.passengers.length }}/{{ routeData.vehicle?.seats || 0 }}</span>
        </div>
        
        <div class="passengers-grid">
          <div 
            v-for="(passenger, index) in routeData.passengers" 
            :key="passenger.user?.id || index"
            class="passenger-card"
          >
            <div class="passenger-number">{{ index + 1 }}</div>
            <div class="passenger-info">
              <h4>{{ passenger.user?.name }}</h4>
              <div class="passenger-address" v-if="passenger.user?.address">
                <MapMarker :size="16" />
                <span>{{ passenger.user.address }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="maps-section" v-if="routeData.optimized_route_url">
        <button class="google-maps-button" @click="openGoogleMaps">
          <GoogleMaps :size="24" />
          <span>Abrir Rota no Google Maps</span>
        </button>
      </div>
    </div>

    <div v-else class="no-data-container">
      <div class="no-data-icon">📭</div>
      <h3>Nenhuma rota encontrada</h3>
      <p>A rota solicitada não foi encontrada ou não existe.</p>
      <button class="back-button" @click="goBack">
        Voltar para a lista
      </button>
    </div>
  </div>
</template>

<style scoped>
.route-details-premium {
  --primary: #022840;
  --accent: #1a73e8;
  --gradient-primary: linear-gradient(135deg, #022840, #1a73e8);
  padding: 2rem;
  min-height: 100vh;
  background: linear-gradient(180deg, #f8fafc 0%, #e2e8f0 100%);
  font-family: 'Poppins', sans-serif;
}

.vehicle-driver-section {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(450px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.passengers-section {
  background: white;
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  margin-bottom: 2rem;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid #f1f5f9;
}

.header-title {
  display: flex;
  align-items: center;
  gap: 1rem;
  color: var(--primary);
}

.header-title h3 {
  font-size: 1.3rem;
  font-weight: 600;
  margin: 0;
}

.passengers-count-badge {
  padding: 0.6rem 1.5rem;
  background: var(--gradient-primary);
  border-radius: 25px;
  color: white;
  font-weight: 600;
  font-size: 1rem;
  box-shadow: 0 4px 15px rgba(26, 115, 232, 0.3);
}

.passengers-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 1rem;
}

.passenger-card {
  display: flex;
  align-items: flex-start;
  gap: 1.2rem;
  padding: 1.2rem;
  background: linear-gradient(135deg, #f8fafc, #ffffff);
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  transition: all 0.3s ease;
  cursor: pointer;
}

.passenger-card:hover {
  transform: translateX(8px);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
  border-color: var(--accent);
  background: linear-gradient(135deg, #ffffff, #f8fafc);
}

.passenger-number {
  width: 45px;
  height: 45px;
  border-radius: 50%;
  background: var(--gradient-primary);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 1.1rem;
  flex-shrink: 0;
  box-shadow: 0 4px 15px rgba(26, 115, 232, 0.3);
}

.passenger-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.passenger-info h4 {
  font-size: 1rem;
  font-weight: 600;
  color: var(--primary);
  margin: 0;
}

.passenger-address {
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
  color: #64748b;
  font-size: 0.85rem;
  line-height: 1.5;
}

.passenger-address svg {
  color: var(--accent);
  flex-shrink: 0;
  margin-top: 0.2rem;
}

.maps-section {
  display: flex;
  justify-content: center;
  margin-top: 2rem;
}

.google-maps-button {
  display: flex;
  align-items: center;
  gap: 1rem;
  background: linear-gradient(135deg, #022840, #1a73e8);
  color: white;
  border: none;
  border-radius: 30px;
  padding: 1.2rem 3rem;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 8px 25px rgba(52, 168, 83, 0.35);
  position: relative;
  overflow: hidden;
}

.google-maps-button::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  transform: translate(-50%, -50%);
  transition: width 0.6s, height 0.6s;
}

.google-maps-button:hover::before {
  width: 300px;
  height: 300px;
}

.google-maps-button:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 35px rgba(52, 168, 83, 0.45);
}

.google-maps-button span,
.google-maps-button svg {
  position: relative;
  z-index: 1;
}

@media (max-width: 1200px) {
  .vehicle-driver-section {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .route-details-premium {
    padding: 1rem;
  }

  .passengers-grid {
    grid-template-columns: 1fr;
  }

  .google-maps-button {
    width: 100%;
    justify-content: center;
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.passengers-section {
  animation: fadeInUp 0.6s ease-out backwards;
}

.passenger-card {
  animation: fadeInUp 0.4s ease-out backwards;
}

.passenger-card:nth-child(1) { animation-delay: 0.8s; }
.passenger-card:nth-child(2) { animation-delay: 0.85s; }
.passenger-card:nth-child(3) { animation-delay: 0.9s; }
.passenger-card:nth-child(4) { animation-delay: 0.95s; }
.passenger-card:nth-child(5) { animation-delay: 1s; }
.passenger-card:nth-child(n+6) { animation-delay: 1.05s; }
</style>