<script setup>
import { ref, onMounted } from 'vue'
import PhotoComp from '@/components/global/profiles-images/PhotoComp.vue'
import ShowPhoto from '@/components/global/profiles-images/ShowPhoto.vue'
import UploadPhoto from '@/components/global/profiles-images/UploadPhoto.vue'
import ModalAddDependent from './ModalAddDependent.vue'

const props = defineProps({
  dependents: {
    type: Array,
    default: () => []
  }
})

const isEditing = ref(false)
const viewPhotoDialog = ref(false)
const changePhotoDialog = ref(false)
const dialog = ref(false)
const isSmallScreen = ref(false)
const selectedDependent = ref(null)
const showDetailsDialog = ref(false)

function toggleEdit() {
  isEditing.value = !isEditing.value
}

function updateScreenSize() {
  isSmallScreen.value = window.matchMedia('(max-width: 1024px)').matches
}

function openDependentDetails(dependent) {
  selectedDependent.value = dependent
  showDetailsDialog.value = true
}

function closeDependentDetails() {
  selectedDependent.value = null
  showDetailsDialog.value = false
}

onMounted(() => {
  updateScreenSize()
  window.addEventListener('resize', updateScreenSize)
})
</script>

<template>
  <v-container fluid class="pa-6">
    <!-- Header -->
    <v-row class="mb-8">
      <v-col cols="12">
        <v-card flat class="bg-transparent">
          <v-card-title class="text-h3 font-weight-bold text-primary pa-0 mb-2">
            Dados dos Dependentes
          </v-card-title>
          <v-card-subtitle class="text-body-1 text-medium-emphasis pa-0">
            Gerencie as informações dos seus dependentes
          </v-card-subtitle>
        </v-card>
      </v-col>
    </v-row>

    <!-- Grid de Cards -->
    <v-row>
      <v-col
        v-for="dependent in props.dependents"
        :key="dependent.id"
        cols="12"
        sm="6"
        lg="4"
        xl="3"
      >
        <v-card
          class="dependent-card overflow-hidden"
          elevation="4"
          hover
          @click="openDependentDetails(dependent)"
        >
          <!-- Imagem grande no topo -->
          <div class="card-image-wrapper">
            <PhotoComp
              :src="dependent.picture_file"
              @view.stop="viewPhotoDialog = true"
              @change.stop="changePhotoDialog = true"
            />
          </div>

          <!-- Informações abaixo da imagem -->
          <v-card-text class="pt-4 pb-5 px-5">
            <div class="text-h6 text-high-emphasis mb-1">{{ dependent.name }}</div>
            <div class="text-body-2 text-medium-emphasis mb-3">{{ dependent.email }}</div>
            <div class="matricula-chip">Matrícula: {{ dependent.passenger_data.student_data.registration }}</div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Botão Adicionar -->
    <v-row class="mt-8">
      <v-col cols="12" class="text-center">
        <v-btn
          @click="dialog = true"
          color="primary"
          size="x-large"
          prepend-icon="mdi-plus"
          variant="elevated"
          class="px-8 py-4"
        >
          Adicionar Dependente
        </v-btn>
      </v-col>
    </v-row>

    <!-- Modal de Detalhes -->
    <v-dialog
      v-model="showDetailsDialog"
      max-width="900"
      persistent
      transition="dialog-bottom-transition"
    >
      <v-card v-if="selectedDependent">
        <!-- Header do Modal -->
        <v-toolbar
          color="primary"
          dark
          flat
        >
          <v-toolbar-title class="text-h5">
            {{ selectedDependent.name }}
          </v-toolbar-title>
          <v-spacer />
          <v-btn
            icon="mdi-close"
            variant="text"
            @click="closeDependentDetails"
          />
        </v-toolbar>

        <!-- Conteúdo do Modal -->
        <v-card-text class="pa-8">
          <v-row>
            <!-- Foto -->
            <v-col cols="12" lg="4" class="text-center">
              <PhotoComp
                :src="selectedDependent.picture_file"
                @view="viewPhotoDialog = true"
                @change="changePhotoDialog = true"
              />
            </v-col>

            <!-- Formulário -->
            <v-col cols="12" lg="8">
              <v-row>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="selectedDependent.name"
                    label="Nome Completo"
                    variant="outlined"
                    :readonly="!isEditing"
                    prepend-inner-icon="mdi-account"
                  />
                </v-col>

                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="selectedDependent.passenger_data.cpf"
                    label="CPF"
                    variant="outlined"
                    :readonly="true"
                    prepend-inner-icon="mdi-card-account-details"
                  />
                </v-col>

                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="selectedDependent.passenger_data.student_data.registration"
                    label="Matrícula"
                    variant="outlined"
                    :readonly="!isEditing"
                    prepend-inner-icon="mdi-school"
                  />
                </v-col>

                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="selectedDependent.email"
                    label="Email"
                    variant="outlined"
                    :readonly="!isEditing"
                    prepend-inner-icon="mdi-email"
                  />
                </v-col>

                <v-col cols="12">
                  <v-text-field
                    v-model="selectedDependent.telephone"
                    label="Telefone"
                    variant="outlined"
                    :readonly="!isEditing"
                    prepend-inner-icon="mdi-phone"
                  />
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-card-text>

        <!-- Ações do Modal -->
        <v-divider />
        <v-card-actions class="pa-6">
          <v-spacer />
          <v-btn
            @click="toggleEdit"
            :color="isEditing ? 'error' : 'primary'"
            variant="tonal"
            prepend-icon="mdi-pencil-outline"
            size="large"
          >
            {{ isEditing ? 'Cancelar' : 'Editar' }}
          </v-btn>

          <v-btn
            v-if="isEditing"
            @click="toggleEdit"
            color="success"
            prepend-icon="mdi-content-save-outline"
            size="large"
          >
            Salvar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Modais -->
    <ShowPhoto v-model="viewPhotoDialog" :src="selectedDependent?.picture_file" />
    <UploadPhoto v-model="changePhotoDialog" :user_id="selectedDependent?.id" />
    <ModalAddDependent v-model="dialog" />
  </v-container>
</template>

<style scoped>
.dependent-card {
  cursor: pointer;
  transition: box-shadow 0.3s ease, transform 0.2s ease;
  border-radius: 16px;
}

.dependent-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 28px rgba(0, 0, 0, 0.15) !important;
}

/* Imagem ocupar toda a largura do card, com cantos superiores arredondados */
.card-image-wrapper :deep(.profile-photo) {
  width: 100% !important;
  height: 180px !important;
}
.card-image-wrapper :deep(.profile-photo img) {
  border-radius: 16px 16px 0 0 !important;
}

.matricula-chip {
  display: inline-block;
  padding: 6px 12px;
  background: #eef2f6;
  color: #4b5563;
  border-radius: 8px;
  font-size: 0.75rem;
  font-weight: 600;
}
</style>

