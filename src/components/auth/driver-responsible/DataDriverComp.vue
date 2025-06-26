<!-- UserProfile.vue -->
<script setup>
import { ref } from 'vue'
import { useAuthStore } from '@/stores'
import PhotoComp from '../profiles-images/PhotoComp.vue'
import ShowPhoto from '../profiles-images/ShowPhoto.vue'
import UploadPhoto from '../profiles-images/UploadPhoto.vue'

const authStore = useAuthStore()
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
                :src="authStore.state.user.picture_file"
                @view="viewPhotoDialog = true"
                @change="changePhotoDialog = true"
            />

            <div class="form-wrapper">
                <div class="form-grid">
                    <v-text-field v-model="authStore.state.user.name" label="Nome" variant="outlined" :readonly="true" />
                    <v-text-field v-model="authStore.state.user.driver_data.cpf" label="CPF" variant="outlined" :readonly="true" />
                    <v-text-field v-model="authStore.state.user.username" label="Username" variant="outlined" :readonly="!isEditing" />
                    <v-text-field v-model="authStore.state.user.email" label="Email" variant="outlined" :readonly="!isEditing" />
                    <v-text-field v-model="authStore.state.user.telephone" label="Telefone" variant="outlined" :readonly="!isEditing" />
                    <v-text-field v-model="authStore.state.user.driver_data.cnh" label="CNH" variant="outlined" :readonly="true" />

                    <div class="edit-button full">
                        <v-btn @click="toggleEdit" color="primary" variant="tonal" prepend-icon="mdi-pencil-outline" rounded="1">Editar</v-btn>
                        <v-btn @click="toggleEdit" color="primary" prepend-icon="mdi-content-save-outline" rounded="1">Salvar</v-btn>
                    </div>
                </div>
            </div>
        </div>

        <ShowPhoto v-model="viewPhotoDialog" :src="authStore.state.user.picture_file" />
        <UploadPhoto v-model="changePhotoDialog" />
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
