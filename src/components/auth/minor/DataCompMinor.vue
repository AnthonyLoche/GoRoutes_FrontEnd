<script setup>
import { ref, onMounted, computed } from 'vue'
import { useAuthStore } from '@/stores'
import PhotoComp from '@/components/global/profiles-images/PhotoComp.vue'
import ShowPhoto from '@/components/global/profiles-images/ShowPhoto.vue'
import UploadPhoto from '@/components/global/profiles-images/UploadPhoto.vue'
import AccountCircle from 'vue-material-design-icons/AccountCircle.vue'
import { LoadingComp } from '@/components'

const authStore = useAuthStore()
const isEditing = ref(false)
const viewPhotoDialog = ref(false)
const changePhotoDialog = ref(false)
const isLoading = ref(true)
const hasError = ref(false)
const errorMessage = ref('')

// Computed para facilitar o acesso aos dados
const userData = computed(() => authStore.state.user)
const passengerData = computed(() => userData.value?.passenger_data)

onMounted(async () => {
  try {
    console.log('DataComp montado')
    console.log('Estado atual do auth store:', authStore.state)

    // Verifica se temos dados do usuário
    if (!userData.value?.name) {
      hasError.value = true
      errorMessage.value = 'Dados do usuário não encontrados'
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

function formatCPF(cpf) {
  if (!cpf) return ''
  return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')
}

// Função para formatar telefone
function formatPhone(phone) {
  if (!phone) return ''
  return phone.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3')
}


</script>

<template>
  <section>
    <LoadingComp v-if="isLoading" />



    <div class="title">
      <AccountCircle />
      <h2>Dados do Perfil</h2>
    </div>
    
    <div class="photo">
      <PhotoComp
        :src="userData.picture_file"
        @view="viewPhotoDialog = true"
        @change="changePhotoDialog = true"
      />

      <div class="form-wrapper">
        <div class="form-grid">
          <!-- Dados Pessoais -->
          <v-text-field
            v-model="userData.name"
            label="Nome Completo"
            variant="outlined"
            :readonly="!isEditing"
          />

          <v-text-field
          v-model="passengerData.cpf"
            label="CPF"
            variant="outlined"
            :readonly="true"
          />

          <v-text-field
            v-model="userData.username"
            label="Username"
            variant="outlined"
            :readonly="!isEditing"
          />

          <v-text-field
            v-model="userData.email"
            label="Email"
            variant="outlined"
            :readonly="!isEditing"
          />

          <v-text-field
            v-model="userData.telephone"
            label="Telefone"
            variant="outlined"
            :readonly="!isEditing"
            class="full"
          />

          <!-- Botões de Edição -->
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
    <ShowPhoto v-model="viewPhotoDialog" :src="userData.picture_file" />
    <UploadPhoto v-model="changePhotoDialog" :user_id="userData.id" />
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

span {
  display: flex;
  justify-content: center;
  align-items: center;
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

.title{
    border-bottom: 2px solid var(--primary-color);
    display: flex;
    gap: 0.5rem;
}
</style>