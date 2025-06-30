<script setup>
import { ref } from 'vue'
import { useAuthStore } from '@/stores'
import PhotoComp from '../profiles-images/PhotoComp.vue'
import ShowPhoto from '../profiles-images/ShowPhoto.vue'
import UploadPhoto from '../profiles-images/UploadPhoto.vue'
import ModalAddDependent from './ModalAddDependent.vue'

const props = defineProps({
  dependents: {
    type: Array,
    default: () => []
  }
})
const authStore = useAuthStore()
const isEditing = ref(false)
const viewPhotoDialog = ref(false)
const changePhotoDialog = ref(false)

const dialog = ref(false)
function toggleEdit() {
  isEditing.value = !isEditing.value
}

</script>
<template>
  <section>
    <v-carousel hide-delimiters show-arrows="hover" height="350">
      <v-carousel-item v-for="dependent in props.dependents" :key="dependent.id"><div class="photo">
      <PhotoComp
        :src="dependent.picture_file"
        @view="viewPhotoDialog = true"
        @change="changePhotoDialog = true"
      />

      <div class="form-wrapper">
        <div class="form-grid">
          <v-text-field
            v-model="dependent.name"
            label="Nome"
            variant="outlined"
            :readonly="true"
          />

          <v-text-field
            v-model="dependent.passenger_data.cpf"
            label="CPF"
            variant="outlined"
            :readonly="true"
          />

          <v-text-field
            v-model="dependent.passenger_data.student_data.registration"
            label="Matrícula"
            variant="outlined"
            :readonly="!isEditing"
          />

          <v-text-field
            v-model="dependent.email"
            label="Email"
            variant="outlined"
            :readonly="!isEditing"
          />

          <v-text-field
            class="full"
            v-model="dependent.telephone"
            label="Telefone"
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
    <ShowPhoto v-model="viewPhotoDialog" :src="dependent.picture_file" />
    <UploadPhoto v-model="changePhotoDialog" /></v-carousel-item>

      
    </v-carousel>
    <v-btn rounded="sm" @click="dialog = !dialog" >Adicionar dependente</v-btn>
    <ModalAddDependent :model-value="dialog" />

  </section>
</template>
<style scoped>
.photo {
  width: 85%;
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
