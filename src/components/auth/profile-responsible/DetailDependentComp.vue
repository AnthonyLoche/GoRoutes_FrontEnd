<script setup>
import { ref, onMounted, reactive } from 'vue'
import PhotoComp from '@/components/global/profiles-images/PhotoComp.vue'
import ShowPhoto from '@/components/global/profiles-images/ShowPhoto.vue'
import UploadPhoto from '@/components/global/profiles-images/UploadPhoto.vue'
import ModalAddDependent from './ModalAddDependent.vue'

const props = defineProps({
  dependent: {
    type: Array,
    default: () => []
  }
})

const isEditing = ref(false)
const viewPhotoDialog = ref(false)
const changePhotoDialog = ref(false)
const dialog = ref(false)
const isSmallScreen = ref(false)
const d = reactive({
  id: props.dependent.id,
  foto: props.dependent.picture_file,
  name: props.dependent.data.name,
  cpf: props.dependent.data.passenger_data.cpf,
  registration: props.dependent.data.passenger_data.student_data.registration,
  email: props.dependent.data.email,
  telephone: props.dependent.data.telephone
})

function toggleEdit() {
  isEditing.value = !isEditing.value
}

function updateScreenSize() {
  isSmallScreen.value = window.matchMedia('(max-width: 1024px)').matches
}

onMounted(() => {
  updateScreenSize()
  window.addEventListener('resize', updateScreenSize)
})

</script>

<template>
  <section>
        <div class="photo">
          <PhotoComp
            :src="d.foto"
            @view="viewPhotoDialog = true"
            @change="changePhotoDialog = true"
          />

          <div class="form-wrapper">
            <div class="form-grid">
              <v-text-field
                v-model="d.name"
                label="Nome"
                variant="outlined"
                :readonly="true"
              />

              <v-text-field
                v-model="d.cpf"
                label="CPF"
                variant="outlined"
                :readonly="true"
              />

              <v-text-field
                v-model="d.registration"
                label="Matrícula"
                variant="outlined"
                :readonly="!isEditing"
              />

              <v-text-field
                v-model="d.email"
                label="Email"
                variant="outlined"
                :readonly="!isEditing"
              />

              <v-text-field
                class="full"
                v-model="d.telephone"
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
        <ShowPhoto v-model="viewPhotoDialog" :src="d.foto" />
        <UploadPhoto v-model="changePhotoDialog" :user_id="d.id" />
    <ModalAddDependent :model-value="dialog" />
  </section>
</template>

<style scoped>
.photo {
  width: 100%;
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

@media (max-width: 1024px) {
  .photo {
    flex-direction: column;
    align-items: center;
  }
  .form-wrapper {
    width: 100%;
  }
  .form-grid {
    display: flex;
    flex-direction: column;
  }
}

.a {
  height: auto !important;
}

.b {
  margin: 0 0 0 20%;
}
</style>