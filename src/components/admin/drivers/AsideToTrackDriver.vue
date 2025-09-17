<script setup>
import { useGoRoutesStore } from '@/stores';
import { computed } from 'vue';

const goRoutesStore = useGoRoutesStore();

const selectedDriver = computed(() => goRoutesStore.state.selectedDriverToTrack);

// Ao clicar em um motorista na lista, definimos o driver selecionado no store
const selectDriverFromAside = (driver) => {
  console.log('[Aside] click driver:', driver);
  // Monta um objeto compatível com os markers do mapa
  const markerLike = {
    position: {
      lat: parseFloat(driver?.my_location?.latitude),
      lng: parseFloat(driver?.my_location?.longitude),
    },
    driverName: driver.driver_name || driver.name,
    email: driver.email,
    id_driver: driver.driver_id || driver.id,
    icon: driver.icon_driver
      ? { url: driver.icon_driver, scaledSize: { width: 50, height: 50 }, anchor: { x: 25, y: 25 } }
      : undefined,
  };
  console.log('[Aside] setting selectedDriverToTrack:', markerLike);
  goRoutesStore.state.selectedDriverToTrack = markerLike;
};
</script>

<template>
  <aside class="vehicle-sidebar">
    <h2 class="header">Rastreamento do Motorista</h2>

    <div v-if="selectedDriver" class="selected-driver">
      <div class="driver-header">
        <div class="driver-icon">
          <img v-if="selectedDriver.icon?.url" :src="selectedDriver.icon.url" alt="Driver Icon" />
          <div v-else class="avatar-placeholder">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4
                1.79-4 4 1.79 4 4 4zm0 2c-2.67
                0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
            </svg>
          </div>
        </div>
        <div class="driver-info">
          <h2>{{ selectedDriver.driverName }}</h2>
        </div>
      </div>

      <div class="driver-details">
        <div class="detail-section">
          <h3>Localização</h3>
          <p class="location">
            Lat: {{ selectedDriver.position.lat }},
            Lng: {{ selectedDriver.position.lng }}
          </p>
        </div>

        <!-- Dados extras fake -->
        <div class="metrics">
          <div class="metric">
            <span class="label">Velocidade</span>
            <span class="value">87 km/h</span>
          </div>
          <div class="metric">
            <span class="label">Combustível</span>
            <span class="value success">73%</span>
          </div>
          <div class="metric">
            <span class="label">Placa</span>
            <span class="value">ABC-1234</span>
          </div>
        </div>

        <div class="extra-info">
          <span class="label">Última atualização:</span>
          <span class="value">Há 2 minutos</span>
        </div>
        <div class="extra-info">
          <span class="label">Status:</span>
          <span class="value">Em movimento</span>
        </div>

        <!-- Botões de ação -->
        <div class="actions">
          <button class="action-btn">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M13,3A9,9 0 0,0 4,12H1L4.89,15.89L4.96,16.03
                L9,12H6A7,7 0 0,1 13,5A7,7 0 0,1
                20,12A7,7 0 0,1 13,19C11.07,19
                9.32,18.21 8.06,16.94L6.64,18.36
                C8.27,20 10.5,21 13,21A9,9 0 0,0
                22,12A9,9 0 0,0 13,3Z" />
            </svg>
            Perfil
          </button>
  
          <button class="action-btn">
            📍 Rota
          </button>
        </div>
      </div>
    </div>

    <!-- Nenhum motorista selecionado -->
    <div v-else class="no-driver">
      <v-icon size="28" color="grey">mdi-alert-circle-outline</v-icon>
      <span class="no-driver-text">Nenhum motorista selecionado</span>
    </div>

    <!-- Lista de Motoristas em Trânsito -->
    <div class="drivers-section">
      <h3>Motoristas em Trânsito</h3>
      <ul class="drivers-list">
        <li v-for="driver in goRoutesStore.state.transiDrivers" :key="driver.id" class="driver-item"
          @click="selectDriverFromAside(driver)">
          <div class="driver-avatar">
            <img v-if="driver.icon_driver" :src="driver.icon_driver" :alt="driver.driver_name" />
            <div v-else class="avatar-placeholder">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4
                  1.79-4 4 1.79 4 4 4zm0 2c-2.67
                  0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
              </svg>
            </div>
          </div>
          <div class="driver-info">
            <span class="driver-name">{{ driver.driver_name }}</span>
            <span class="driver-status">Em movimento</span>
          </div>
        </li>
      </ul>
    </div>
  </aside>
</template>


<style scoped>
.vehicle-sidebar {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background: #f8fafc;
  border-radius: 12px;
  overflow: hidden;
}

.selected-driver {
  background: white;
  border-radius: 12px;
  margin: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.driver-header {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.driver-icon {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
}

.driver-icon img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.avatar-placeholder {
  color: #9ca3af;
}

.avatar-placeholder svg {
  width: 24px;
  height: 24px;
}

.driver-info {
  display: flex;
  align-items: center;
  gap: 8px;
}

.driver-info h2 {
  font-size: 12px;
  font-weight: 600;
}

.driver-email {
  font-size: 14px;
  opacity: 0.8;
}

.driver-details {
  padding: 16px;
}

.detail-section h3 {
  margin: 0 0 8px 0;
  font-size: 14px;
  font-weight: 600;
  color: #374151;
}

.location {
  color: #6b7280;
  font-size: 13px;
  margin: 0 0 12px 0;
}

/* Novos estilos */
.metrics {
  display: flex;
  gap: 16px;
  margin-bottom: 12px;
}

.metric {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.label {
  font-size: 11px;
  color: #9ca3af;
  text-transform: uppercase;
}

.value {
  font-size: 14px;
  font-weight: 600;
  color: #374151;
}

.value.success {
  color: #16a34a;
}

.extra-info {
  font-size: 13px;
  margin-bottom: 4px;
  display: flex;
  gap: 6px;
}

.actions {
  display: flex;
  gap: 8px;
  margin-top: 12px;
}

.action-btn {
  flex: 1;
  padding: 8px;
  border-radius: 6px;
  background: #f3f4f6;
  border: 1px solid #d1d5db;
  font-size: 13px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  transition: background 0.2s;
}

.action-btn:hover {
  background: #e5e7eb;
}

.action-btn svg {
  width: 16px;
  height: 16px;
}

/* Lista de motoristas do segundo componente */
.drivers-section {
  flex: 1;
  margin: 0 16px 16px 16px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.drivers-section h3 {
  margin: 0 0 12px 0;
  font-size: 16px;
  font-weight: 600;
  color: #374151;
}

.drivers-list {
  flex: 1;
  overflow-y: auto;
  padding: 0;
  margin: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.driver-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  cursor: pointer;
}

.driver-avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  overflow: hidden;
  background: #f3f4f6;
  display: flex;
  align-items: center;
  justify-content: center;
}

.driver-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.driver-name {
  font-weight: 500;
  color: #374151;
  font-size: 14px;
}

.driver-status {
  font-size: 12px;
  color: #6b7280;
}

.no-driver {
  margin: 16px;
  padding: 24px;
  background: white;
  border-radius: 12px;
  text-align: center;
  color: #6b7280;
  font-size: 14px;
  font-style: italic;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.no-driver-text {
  font-size: 14px;
}

.header {
  font-size: 1.5rem;
  font-weight: 600;
  color: #374151;
  padding: 16px;
  border-bottom: 1px solid #e5e7eb;
}
</style>
