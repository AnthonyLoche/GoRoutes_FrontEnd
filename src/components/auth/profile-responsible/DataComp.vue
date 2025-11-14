<script setup>
import { ref, onMounted } from 'vue'
import { useAuthStore } from '@/stores'
import PhotoComp from '@/components/global/profiles-images/PhotoComp.vue'
import ShowPhoto from '@/components/global/profiles-images/ShowPhoto.vue'
import UploadPhoto from '@/components/global/profiles-images/UploadPhoto.vue'
import { LoadingComp } from '@/components'

const authStore = useAuthStore()
const isEditing = ref(false)
const viewPhotoDialog = ref(false)
const changePhotoDialog = ref(false)
const isLoading = ref(true)
const hasError = ref(false)
const errorMessage = ref('')

// Dados mockados para teste
const mockUser = {
  name: 'Usuário Teste',
  responsible_data: {
    cpf: '123.456.789-00'
  },
  username: 'teste',
  email: 'teste@teste.com',
  telephone: '(11) 99999-9999',
  picture_file: null,
  id: 1
}

onMounted(async () => {
  try {
    console.log('DataComp montado')
    console.log('Estado atual do auth store:', authStore.state)

    if (!authStore.state?.user?.name) {
      console.log('Usando dados mockados')
      authStore.state.user = mockUser
    }

    isLoading.value = false
  } catch (error) {
    console.error('Erro ao montar DataComp:', error)
    hasError.value = true
    errorMessage.value = error.message
    isLoading.value = false
  }
})

function toggleEdit() {
  isEditing.value = !isEditing.value
}
</script>

<template>
  <section>
    <LoadingComp v-if="isLoading" />

    <div v-else-if="hasError" class="error-container">
      <p>Erro ao carregar os dados: {{ errorMessage }}</p>
    </div>

    <div v-else class="photo">
      <PhotoComp
        :src="authStore.state.user.picture_file"
        @view="viewPhotoDialog = true"
        @change="changePhotoDialog = true"
      />

      <div class="form-wrapper">
        <div class="form-grid">
          <v-text-field
            v-model="authStore.state.user.name"
            label="Nome"
            variant="outlined"
            :readonly="true"
          />

          <v-text-field
            v-model="authStore.state.user.responsible_data.cpf"
            label="CPF"
            variant="outlined"
            :readonly="true"
          />

          <v-text-field
            v-model="authStore.state.user.username"
            label="Username"
            variant="outlined"
            :readonly="!isEditing"
          />

          <v-text-field
            v-model="authStore.state.user.email"
            label="Email"
            variant="outlined"
            :readonly="!isEditing"
          />

          <v-text-field
            class="full"
            v-model="authStore.state.user.telephone"
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
    <ShowPhoto v-model="viewPhotoDialog" :src="authStore.state.user.picture_file" />
    <UploadPhoto v-model="changePhotoDialog" :user_id="authStore.state.user.id" />
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
@media (max-width: 1024px) {
  .photo {
    flex-direction: column;
    align-items: center;
  }
  .form-grid {
    grid-template-columns: 1fr;
    gap: .5rem
  }
  .full {
    grid-column: span 1;
  }
  .edit-button {
    justify-content: space-around;
  }
}

.error-container {
  text-align: center;
  padding: 2rem;
  color: var(--error-color);
  background-color: var(--error-bg-color);
  border-radius: 8px;
  margin: 1rem 0;
}
</style>
