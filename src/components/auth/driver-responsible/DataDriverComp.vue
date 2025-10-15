<script setup>
import { ref } from 'vue'
import { useAuthStore } from '@/stores'
import PhotoComp from '@/components/global/profiles-images/PhotoComp.vue'
import ShowPhoto from '@/components/global/profiles-images/ShowPhoto.vue'
import UploadPhoto from '@/components/global/profiles-images/UploadPhoto.vue'
import ModalUpdateDriverComp from './ModalUpdateDriverComp.vue'

const authStore = useAuthStore()

// Controle dos diálogos
const viewPhotoDialog = ref(false)
const changePhotoDialog = ref(false)
const editDialog = ref(false)

function openEditDialog() {
  const user = authStore.state.user
  authStore.selectedUserToUpdate.id = user.id
  authStore.selectedUserToUpdate.name = user.name
  authStore.selectedUserToUpdate.username = user.username
  authStore.selectedUserToUpdate.email = user.email
  authStore.selectedUserToUpdate.telephone = user.telephone // importante usar o mesmo nome
  editDialog.value = true
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
          <v-text-field v-model="authStore.state.user.name" label="Nome" variant="outlined" readonly />
          <v-text-field v-model="authStore.state.user.username" label="Username" variant="outlined" readonly />
          <v-text-field v-model="authStore.state.user.email" label="Email" variant="outlined" readonly />
          <v-text-field v-model="authStore.state.user.telephone" label="Telefone" variant="outlined" readonly />
          <v-text-field v-model="authStore.state.user.driver_data.cnh" label="CNH" variant="outlined" readonly />
          <v-text-field v-model="authStore.state.user.driver_data.cpf" label="CPF" variant="outlined" readonly />

          <div class="edit-button full">
            <v-btn
              @click="openEditDialog"
              color="primary"
              variant="tonal"
              prepend-icon="mdi-pencil-outline"
              rounded="1"
            >
              Editar
            </v-btn>
          </div>
        </div>
      </div>
    </div>

    <!-- Modais -->
    <ShowPhoto v-model="viewPhotoDialog" :src="authStore.state.user.picture_file" />
    <UploadPhoto v-model="changePhotoDialog" :user_id="authStore.state.user.id" />
    <ModalUpdateDriverComp v-model="editDialog" />
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
.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
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
.full {
  grid-column: span 2;
}
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
  }
}
</style>
