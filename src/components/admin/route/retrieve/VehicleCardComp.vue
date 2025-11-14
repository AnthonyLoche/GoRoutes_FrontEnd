<!-- eslint-disable no-unused-vars -->
<script setup>
import Bus from 'vue-material-design-icons/Bus.vue'

const props = defineProps({
  vehicle: {
    type: Object,
    required: true
  },
  occupancyPercentage: {
    type: String,
    default: '0'
  },
  passengersCount: {
    type: Number,
    default: 0
  }
})
</script>

<template>
  <div class="vehicle-card" v-if="vehicle">
    <div class="card-header">
      <div style="display: flex; gap: .5rem;">
        <Bus :size="28" />
        <h3>Veículo</h3>
      </div>
      <div style="display: flex; gap: .5rem; align-items: center;">
        <span class="info-label">Status:</span>
        <span class="status-badge-inline available">{{ vehicle.status }}</span>
      </div>
    </div>
    <div class="vehicle-content">
      <div class="vehicle-image" v-if="vehicle.picture">
        <img :src="vehicle.picture" :alt="vehicle.model" />
      </div>
      <div class="vehicle-info">
        <div class="info-row">
          <span class="info-label">Modelo:</span>
          <span class="info-value">{{ vehicle.model }}</span>
        </div>
        <div class="info-row">
          <span class="info-label">Placa:</span>
          <span class="info-value">{{ vehicle.plate }}</span>
        </div>
        <div class="info-row">
          <span class="info-label">Capacidade:</span>
          <span class="info-value">{{ vehicle.seats }} assentos</span>
        </div>
        <div class="occupancy-bar">
          <div class="occupancy-label">
            <span>Ocupação</span>
            <span class="occupancy-percentage">{{ occupancyPercentage }}%</span>
          </div>
          <div class="progress-bar">
            <div class="progress-fill" :style="{ width: occupancyPercentage + '%' }"></div>
          </div>
          <span class="occupancy-text">{{ passengersCount }} de {{ vehicle.seats }} assentos ocupados</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.vehicle-card {
  background: white;
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
}

.vehicle-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
}

.card-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid #f1f5f9;
  color: var(--primary);
  justify-content: space-between;
}

.card-header h3 {
  font-size: 1.3rem;
  font-weight: 600;
  margin: 0;
}

.vehicle-content {
  display: flex;
  gap: 1.5rem;
}

.vehicle-image {
  width: 180px;
  height: 180px;
  border-radius: 14px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  flex-shrink: 0;
}

.vehicle-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.vehicle-info {
  flex: 1;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.info-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.6rem;
  background: linear-gradient(135deg, #f8fafc, #ffffff);
  border-radius: 8px;
}

.info-label {
  font-size: 0.9rem;
  color: #64748b;
  font-weight: 500;
}

.info-value {
  font-size: 1rem;
  font-weight: 600;
  color: var(--primary);
}

.status-badge-inline {
  padding: 0.4rem 1rem;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 600;
}

.status-badge-inline.available {
  background: linear-gradient(135deg, rgba(76, 175, 80, 0.15), rgba(76, 175, 80, 0.25));
  color: #4CAF50;
}

.occupancy-bar {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-top: 0.5rem;
}

.occupancy-label {
  display: flex;
  justify-content: space-between;
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--primary);
}

.occupancy-percentage {
  color: var(--accent);
}

.progress-bar {
  width: 100%;
  height: 10px;
  background: #e2e8f0;
  border-radius: 10px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: var(--gradient-primary);
  border-radius: 10px;
  transition: width 0.5s ease;
}

.occupancy-text {
  font-size: 0.8rem;
  color: #64748b;
}

@media (max-width: 768px) {
  .vehicle-content {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .vehicle-image {
    width: 100%;
    max-width: 250px;
    height: 200px;
  }

  .vehicle-info {
    grid-template-columns: 1fr;
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

.vehicle-card {
  animation: fadeInUp 0.6s ease-out backwards;
}
</style>