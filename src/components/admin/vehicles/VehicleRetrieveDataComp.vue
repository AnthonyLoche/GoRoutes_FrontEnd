<script setup>
import { ref, computed } from 'vue'
import { useVehiclesStore } from '@/stores'

import PhotoComp from '@/components/global/profiles-images/PhotoComp.vue'
import ShowPhoto from '@/components/global/profiles-images/ShowPhoto.vue'
import UploadPhoto from '@/components/global/profiles-images/UploadPhoto.vue'

import VehicleDocuments from './documents/VehicleDocuments.vue'

const vehicleStore = useVehiclesStore()
const isEditing = ref(false)
const viewPhotoDialog = ref(false)
const changePhotoDialog = ref(false)

function toggleEdit() {
  isEditing.value = !isEditing.value
}

const statusOptions = [
  { value: 'Disponivel', label: 'Disponível', color: 'success' },
  { value: 'em rota', label: 'Em Rota', color: 'warning' },
  { value: 'Manutencao', label: 'Manutenção', color: 'error' }
]

const currentStatus = computed(() => {
  return vehicleStore.state.selectedVehicle.status || 'disponivel'
})

function selectStatus(status) {
  if (isEditing.value) {
    vehicleStore.state.selectedVehicle.status = status
  }
}
</script>

<template>
  <section>
    <div class="photo">
      <PhotoComp
        :src="vehicleStore.state.selectedVehicle.picture"
        @view="viewPhotoDialog = true"
        @change="changePhotoDialog = true"
      />

      <div class="form-wrapper">
        <div class="form-grid">
          <v-text-field
            v-model="vehicleStore.state.selectedVehicle.plate"
            label="Placa"
            variant="outlined"
            :readonly="true"
          />

          <v-text-field
            v-model="vehicleStore.state.selectedVehicle.model"
            label="Modelo"
            variant="outlined"
            :readonly="!isEditing"
          />

          <v-text-field
            class="full"
            v-model="vehicleStore.state.selectedVehicle.seats"
            label="Capacidade"
            variant="outlined"
            :readonly="!isEditing"
          />

          <div class="full status-section">
            <div class="status-label">Status</div>
            <div class="status-tags-grid">
              <v-chip
                v-for="status in statusOptions"
                :key="status.value"
                :color="status.color"
                :variant="currentStatus === status.value ? 'flat' : 'outlined'"
                class="status-chip"
                :class="{ 'editable': isEditing, 'selected': currentStatus === status.value }"
                @click="selectStatus(status.value)"
              >
                {{ status.label }}
              </v-chip>
            </div>
          </div>

          <div class="edit-button full">
            <v-btn
              @click="toggleEdit"
              color="primary"
              variant="tonal"
              prepend-icon="mdi-pencil-outline"
              rounded="1"
            >
              {{ isEditing ? 'Cancelar' : 'Editar' }}
            </v-btn>
            <v-btn
              v-if="isEditing"
              @click="toggleEdit"
              color="primary"
              prepend-icon="mdi-content-save-outline"
              rounded="1"
            >
              Salvar
            </v-btn>
          </div>
        </div>
      </div>
    </div>

    <ShowPhoto v-model="viewPhotoDialog" :src="vehicleStore.state.selectedVehicle.picture" />
    <UploadPhoto v-model="changePhotoDialog" :vehicle_id="vehicleStore.state.selectedVehicle.id" type="vehicle" />

    <div class="documents-section">
      <VehicleDocuments
        :vehicle-id="vehicleStore.state.selectedVehicle.id"
        :documents="{
          CRLV: vehicleStore.state.selectedVehicle.CRLV,
          CV: vehicleStore.state.selectedVehicle.CV,
          AD: vehicleStore.state.selectedVehicle.AD
        }"
      />
    </div>
  </section>
</template>

<style scoped>
.photo {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 2rem;
  margin: 2rem auto;
}

.form-wrapper {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
}

.edit-button {
  display: flex;
  align-items: end;
  justify-content: end;
  width: 100%;
  gap: 1rem;
}

.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  width: 100%;
}

.full {
  grid-column: span 2;
}

/* Estilos para a seção de status */
.status-section {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.status-label {
  font-size: 0.875rem;
  font-weight: 500;
  color: rgba(0, 0, 0, 0.6);
  margin-bottom: 0.25rem;
}

.status-tags-grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 0.75rem;
  width: 100%;
}

.status-chip {
  cursor: default;
  transition: all 0.2s ease;
  font-weight: 500;
  min-width: auto;
  justify-content: center;
  width: 100%;
  height: 48px;
  font-size: 1rem;
}

.status-chip.editable {
  cursor: pointer;
}

.status-chip.editable:hover {
  transform: translateY(-1px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

.status-chip.selected {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  font-weight: 600;
}

.documents-section {
  margin-top: 3rem;
  padding: 1.5rem;
  border: 1px solid var(--v-border-color, #ccc);
  border-radius: 12px;
  background: #fafafa;
}

/* Responsividade */
@media (max-width: 1024px) {
  .photo {
    flex-direction: column;
    align-items: center;
  }
  
  .form-grid {
    grid-template-columns: 1fr;
    gap: 0.5rem;
  }
  
  .full {
    grid-column: span 1;
  }
  
  .edit-button {
    justify-content: space-around;
    margin-top: 1rem;
  }
  
  .status-tags-grid {
    grid-template-columns: 1fr;
    gap: 0.5rem;
  }
  
  .status-chip {
    height: 44px;
    font-size: 0.9rem;
  }
}

@media (max-width: 768px) {
  .status-tags-grid {
    grid-template-columns: 1fr;
  }
}
</style>