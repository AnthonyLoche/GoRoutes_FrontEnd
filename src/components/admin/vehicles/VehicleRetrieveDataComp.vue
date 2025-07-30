<script setup>
import { ref } from 'vue'
import { useVehiclesStore } from '@/stores'
import PhotoComp from '@/components/global/profiles-images/PhotoComp.vue'
import ShowPhoto from '@/components/global/profiles-images/ShowPhoto.vue'
import UploadPhoto from '@/components/global/profiles-images/UploadPhoto.vue'

const vehicleStore = useVehiclesStore()
const isEditing = ref(false)
const viewPhotoDialog = ref(false)
const changePhotoDialog = ref(false)

function toggleEdit() {
    isEditing.value = !isEditing.value
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

                    <v-text-field
                        class="full"
                        v-model="vehicleStore.state.selectedVehicle.status"
                        label="Status"
                        variant="outlined"
                        :readonly="!isEditing"
                    />

                    <div class="edit-button full">
                        <v-btn
                            @click="toggleEdit"
                            color="primary"
                            variant="tonal"
                            prepend-icon="mdi-pencil-outline"
                            rounded="1"
                        >
                            Editar
                        </v-btn>
                        <v-btn
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

        <!-- Modais -->
        <ShowPhoto v-model="viewPhotoDialog" :src="vehicleStore.state.selectedVehicle.picture" />
        <UploadPhoto v-model="changePhotoDialog" :vehicle_id="vehicleStore.state.selectedVehicle.id" />
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
</style>
