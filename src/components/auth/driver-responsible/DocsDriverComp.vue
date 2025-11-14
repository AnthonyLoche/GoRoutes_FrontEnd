<script setup>
import { ref, computed } from 'vue'
import { useDriversStore } from '@/stores'
import { useAuthStore } from '@/stores'
import PlusIcon from "vue-material-design-icons/Plus.vue"
import FileDocument from "vue-material-design-icons/FileDocument.vue"
import {  showErrorToast } from '@/utils/toast'

const driversStore = useDriversStore()
const authStore = useAuthStore()

const uploadInProgress = ref({
  cnh: false,
  course: false,
  toxic: false
})

const currentDocuments = computed(() => ({
  cnh: authStore.state.user?.driver_data?.cnh_document,
  course: authStore.state.user?.driver_data?.course_document,
  toxic: authStore.state.user?.driver_data?.toxic_exam_document
}))

const documentConfig = {
  cnh: {
    type: 'cnh_document',
    label: 'CNH',
    fullName: 'Carteira Nacional de Habilitação'
  },
  course: {
    type: 'course_document',
    label: 'CURSO',
    fullName: 'Certificado de Curso'
  },
  toxic: {
    type: 'toxic_exam_document',
    label: 'TOXICOLÓGICO',
    fullName: 'Exame Toxicológico'
  }
}

async function handleFileUpload(event, docType) {
  const file = event.target.files[0]
  if (!file) return

  const validExtensions = ['.pdf', '.jpg', '.jpeg', '.png']
  const fileExtension = '.' + file.name.split('.').pop().toLowerCase()
  
  if (!validExtensions.includes(fileExtension)) {
    showErrorToast('Tipo de arquivo não permitido. Use: PDF, JPG, JPEG ou PNG')
    return
  }

  if (file.size > 10 * 1024 * 1024) {
    showErrorToast('Arquivo muito grande. Tamanho máximo: 10MB')
    return
  }

  uploadInProgress.value[docType] = true

  try {
    const formData = new FormData()
    formData.append('document_type', documentConfig[docType].type)
    formData.append('driver_id', authStore.state.user.driver_data.id)
    formData.append('document', file)

    await driversStore.updateDriverDocument(formData)
    
  } catch (error) {
    console.error('Erro ao fazer upload do documento:', error)
    showErrorToast('Erro ao fazer upload do documento')
  } finally {
    uploadInProgress.value[docType] = false
    event.target.value = ''
  }
}

function viewDocument(document, docType) {
  if (document && document.file_download) {
    window.open(document.file_download, '_blank')
  } else {
    showErrorToast(`${documentConfig[docType].fullName} não disponível para visualização`)
  }
}

function triggerFileInput(docType) {
  const input = document.getElementById(`${docType}-file`)
  if (input) {
    input.click()
  }
}
</script>

<template>
  <section>
    <!-- CNH -->
    <div class="container-item">
      <h2>CNH</h2>
      <div class="item" :class="{ 'has-document': currentDocuments.cnh }">
        <input 
          type="file" 
          id="cnh-file" 
          accept=".pdf,.jpg,.jpeg,.png"
          @change="(event) => handleFileUpload(event, 'cnh')"
          :disabled="uploadInProgress.cnh"
        />
        
        <div class="document-content">
          <template v-if="!currentDocuments.cnh">
            <div class="no-document">
              <span class="icon"><PlusIcon :size="32" /></span>
              <p>Nenhum documento enviado</p>
              <v-btn 
                @click="triggerFileInput('cnh')"
                color="primary"
                variant="tonal"
                prepend-icon="mdi-upload"
                :loading="uploadInProgress.cnh"
                :disabled="uploadInProgress.cnh"
              >
                Enviar Documento
              </v-btn>
            </div>
          </template>
          
          <template v-else>
            <div class="has-document">
              <span class="icon"><FileDocument :size="32" /></span>
              <p class="document-status">Documento Enviado</p>
              <div class="actions">
                <v-btn 
                  @click="viewDocument(currentDocuments.cnh, 'cnh')"
                  color="primary"
                  variant="outlined"
                  prepend-icon="mdi-eye"
                  size="small"
                >
                  Ver
                </v-btn>
                <v-btn 
                  @click="triggerFileInput('cnh')"
                  color="primary"
                  variant="tonal"
                  prepend-icon="mdi-upload"
                  size="small"
                  :loading="uploadInProgress.cnh"
                  :disabled="uploadInProgress.cnh"
                >
                  Substituir
                </v-btn>
              </div>
            </div>
          </template>
        </div>
      </div>
    </div>

    <div class="container-item">
      <h2>CURSO</h2>
      <div class="item" :class="{ 'has-document': currentDocuments.course }">
        <input 
          type="file" 
          id="course-file" 
          accept=".pdf,.jpg,.jpeg,.png"
          @change="(event) => handleFileUpload(event, 'course')"
          :disabled="uploadInProgress.course"
        />
        
        <div class="document-content">
          <template v-if="!currentDocuments.course">
            <!-- Estado sem documento -->
            <div class="no-document">
              <span class="icon"><PlusIcon :size="32" /></span>
              <p>Nenhum documento enviado</p>
              <v-btn 
                @click="triggerFileInput('course')"
                color="primary"
                variant="tonal"
                prepend-icon="mdi-upload"
                :loading="uploadInProgress.course"
                :disabled="uploadInProgress.course"
              >
                Enviar Documento
              </v-btn>
            </div>
          </template>
          
          <template v-else>
            <!-- Estado com documento -->
            <div class="has-document">
              <span class="icon"><FileDocument :size="32" /></span>
              <p class="document-status">Documento Enviado</p>
              <div class="actions">
                <v-btn 
                  @click="viewDocument(currentDocuments.course, 'course')"
                  color="primary"
                  variant="outlined"
                  prepend-icon="mdi-eye"
                  size="small"
                >
                  Ver
                </v-btn>
                <v-btn 
                  @click="triggerFileInput('course')"
                  color="primary"
                  variant="tonal"
                  prepend-icon="mdi-upload"
                  size="small"
                  :loading="uploadInProgress.course"
                  :disabled="uploadInProgress.course"
                >
                  Substituir
                </v-btn>
              </div>
            </div>
          </template>
        </div>
      </div>
    </div>

    <!-- TOXICOLÓGICO -->
    <div class="container-item">
      <h2>TOXICOLÓGICO</h2>
      <div class="item" :class="{ 'has-document': currentDocuments.toxic }">
        <input 
          type="file" 
          id="toxic-file" 
          accept=".pdf,.jpg,.jpeg,.png"
          @change="(event) => handleFileUpload(event, 'toxic')"
          :disabled="uploadInProgress.toxic"
        />
        
        <div class="document-content">
          <template v-if="!currentDocuments.toxic">
            <!-- Estado sem documento -->
            <div class="no-document">
              <span class="icon"><PlusIcon :size="32" /></span>
              <p>Nenhum documento enviado</p>
              <v-btn 
                @click="triggerFileInput('toxic')"
                color="primary"
                variant="tonal"
                prepend-icon="mdi-upload"
                :loading="uploadInProgress.toxic"
                :disabled="uploadInProgress.toxic"
              >
                Enviar Documento
              </v-btn>
            </div>
          </template>
          
          <template v-else>
            <!-- Estado com documento -->
            <div class="has-document">
              <span class="icon"><FileDocument :size="32" /></span>
              <p class="document-status">Documento Enviado</p>
              <div class="actions">
                <v-btn 
                  @click="viewDocument(currentDocuments.toxic, 'toxic')"
                  color="primary"
                  variant="outlined"
                  prepend-icon="mdi-eye"
                  size="small"
                >
                  Ver
                </v-btn>
                <v-btn 
                  @click="triggerFileInput('toxic')"
                  color="primary"
                  variant="tonal"
                  prepend-icon="mdi-upload"
                  size="small"
                  :loading="uploadInProgress.toxic"
                  :disabled="uploadInProgress.toxic"
                >
                  Substituir
                </v-btn>
              </div>
            </div>
          </template>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
section {
  margin-top: 2rem;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 1rem;
}

.container-item {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.item {
  width: 90%;
  margin: auto;
  border: 2px dashed var(--primary-color);
  border-radius: 8px;
  height: 12rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  position: relative;
  background-color: white;
}

.item.has-document {
  border: 2px solid var(--success-color);
  background-color: rgba(76, 175, 80, 0.05);
}

input[type="file"] {
  display: none;
}

.document-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  text-align: center;
  width: 100%;
  height: 100%;
  padding: 1rem;
}

.no-document,
.has-document {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  width: 100%;
}

.icon {
  color: var(--primary-color);
  margin-bottom: 0.5rem;
}

.document-status {
  color: var(--success-color);
  font-weight: 600;
  margin: 0;
}

.actions {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  justify-content: center;
}

p {
  margin: 0;
  color: rgba(0, 0, 0, 0.7);
}

@media screen and (max-width: 1024px) {
  section {
    grid-template-columns: 1fr;
  }
  
  .item {
    height: 10rem;
  }
  
  .actions {
    flex-direction: column;
    width: 100%;
  }
  
  .actions .v-btn {
    width: 100%;
  }
}
</style>