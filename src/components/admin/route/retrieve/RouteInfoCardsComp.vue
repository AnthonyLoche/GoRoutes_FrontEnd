<!-- eslint-disable no-unused-vars -->
<script setup>
import MapMarker from 'vue-material-design-icons/MapMarker.vue'
import MapMarkerRadius from 'vue-material-design-icons/MapMarkerRadius.vue'
import Clock from 'vue-material-design-icons/Clock.vue'
import RoadVariant from 'vue-material-design-icons/RoadVariant.vue'

const props = defineProps({
  routeData: {
    type: Object,
    required: true
  },
  distanceKm: {
    type: String,
    default: '0.0'
  }
})

const formatTime = (timeString) => {
  if (!timeString) return ''
  return timeString.slice(0, 5)
}
</script>

<template>
  <div class="route-info-section">
    <!-- Status Badge -->
    <div class="status-section">
      <div class="status-badge active" v-if="routeData.is_active">
        <div class="status-dot"></div>
        <span>Rota Ativa</span>
      </div>
      <div class="status-badge inactive" v-else>
        <div class="status-dot inactive-dot"></div>
        <span>Rota Inativa</span>
      </div>
      <div class="status-badge auto-recalc" v-if="routeData.auto_recalculate">
        <span>🔄 Recálculo Automático Ativo</span>
      </div>
    </div>

    <!-- Cards de Informações Principais -->
    <div class="info-cards-grid">
      <div class="info-card origin-card">
        <div class="card-icon">
          <MapMarker :size="28" />
        </div>
        <div class="card-content">
          <span class="card-label">Origem</span>
          <span class="card-value">{{ routeData.origin }}</span>
        </div>
      </div>

      <div class="info-card destination-card">
        <div class="card-icon">
          <MapMarkerRadius :size="28" />
        </div>
        <div class="card-content">
          <span class="card-label">Destino</span>
          <span class="card-value">{{ routeData.destination }}</span>
        </div>
      </div>

      <div class="info-card time-card">
        <div class="card-icon">
          <Clock :size="28" />
        </div>
        <div class="card-content">
          <span class="card-label">Horário</span>
          <span class="card-value">{{ formatTime(routeData.init_hour) }} - {{ formatTime(routeData.end_hour) }}</span>
          <span class="card-detail" v-if="routeData.duration">Duração: {{ routeData.duration }} minutos</span>
        </div>
      </div>

      <div class="info-card distance-card">
        <div class="card-icon">
          <RoadVariant :size="28" />
        </div>
        <div class="card-content">
          <span class="card-label">Distância Total</span>
          <span class="card-value">{{ distanceKm }} km</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
:root{
      --gradient-primary: linear-gradient(135deg, #022840, #1a73e8);
}
.route-info-section {
  margin-bottom: 2rem;
}

/* Status Section */
.status-section {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
}

.status-badge {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.8rem 1.5rem;
  border-radius: 25px;
  font-weight: 600;
  font-size: 0.9rem;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
}

.status-badge.active {
  background: linear-gradient(135deg, rgba(76, 175, 80, 0.15), rgba(76, 175, 80, 0.25));
  color: #4CAF50;
}

.status-badge.inactive {
  background: linear-gradient(135deg, rgba(156, 163, 175, 0.15), rgba(107, 114, 128, 0.25));
  color: #6b7280;
}

.status-badge.auto-recalc {
  background: linear-gradient(135deg, rgba(26, 115, 232, 0.15), rgba(2, 40, 64, 0.15));
  color: var(--primary);
}

.status-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #4CAF50;
  animation: pulse 2s infinite;
}

.status-dot.inactive-dot {
  background: #6b7280;
  animation: none;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.5;
    transform: scale(1.2);
  }
}

/* Info Cards Grid */
.info-cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

.info-card {
  background: white;
  border-radius: 16px;
  padding: 2rem;
  display: flex;
  gap: 1.5rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.info-card::before {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 4px;
  transition: height 0.3s ease;
}

.info-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 35px rgba(0, 0, 0, 0.12);
}

.info-card:hover::before {
  height: 6px;
}

.origin-card::before {
  background: var(--gradient-primary);
}

.destination-card::before {
  background:var(--gradient-primary);
}

.time-card::before {
  background: var(--gradient-primary);
}

.distance-card::before {
  background: var(--gradient-primary);
}

.card-icon {
  width: 60px;
  height: 60px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
  flex-shrink: 0;
}

.origin-card .card-icon {
  background: var(--gradient-primary);
}

.destination-card .card-icon {
  background: var(--gradient-primary);
}

.time-card .card-icon {
  background: var(--gradient-primary);
}

.distance-card .card-icon {
  background: var(--gradient-primary);
}

.card-content {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  flex: 1;
}

.card-label {
  font-size: 0.9rem;
  color: #64748b;
  font-weight: 500;
}

.card-value {
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--primary);
  line-height: 1.4;
}

.card-detail {
  font-size: 0.85rem;
  color: #64748b;
  font-weight: 500;
}

/* Responsividade */
@media (max-width: 768px) {
  .status-section {
    flex-direction: column;
  }

  .info-cards-grid {
    grid-template-columns: 1fr;
  }
}

/* Animações */
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

.info-card {
  animation: fadeInUp 0.6s ease-out backwards;
}

.info-card:nth-child(1) { animation-delay: 0.1s; }
.info-card:nth-child(2) { animation-delay: 0.2s; }
.info-card:nth-child(3) { animation-delay: 0.3s; }
.info-card:nth-child(4) { animation-delay: 0.4s; }
</style>