<script setup>
import { ref } from "vue"
import DocumentCard from "./DocumentCard.vue"
import DocumentViewer from "./DocumentView.vue"
import DocumentUploader from "./DocumentUpload.vue"

// Props que vêm do pai (ex: página do veículo)
const props = defineProps({
  vehicleId: {
    type: Number,
    required: true
  },
  documents: {
    type: Object,
    default: () => ({
      CRLV: null,
      CV: null,
      AD: null,
    })
  }
})

// Controle dos modais
const viewerOpen = ref(false)
const uploaderOpen = ref(false)

// Dados do modal atual
const currentDoc = ref({
  type: null,
  src: null
})

// Abrir modal de visualização
function handleView({ type, src }) {
  currentDoc.value = { type, src }
  viewerOpen.value = true
}

// Abrir modal de upload
function handleUpload({ type, vehicleId }) {
  currentDoc.value = { type, src: null }
  uploaderOpen.value = true
}
</script>

<template>
  <div class="documents-container">
    <h2>Documentos do Veículo</h2>

    <!-- Cards de documentos -->
    <DocumentCard
      type="CRLV"
      :src="props.documents.CRLV"
      :vehicle-id="props.vehicleId"
      @view="handleView"
      @upload="handleUpload"
    />
    <DocumentCard
      type="CV"
      :src="props.documents.CV"
      :vehicle-id="props.vehicleId"
      @view="handleView"
      @upload="handleUpload"
    />
    <DocumentCard
      type="AD"
      :src="props.documents.AD"
      :vehicle-id="props.vehicleId"
      @view="handleView"
      @upload="handleUpload"
    />

    <!-- Visualizador -->
    <DocumentViewer
      v-model="viewerOpen"
      :src="currentDoc.src"
      :type="currentDoc.type"
    />

    <!-- Uploader -->
    <DocumentUploader
      v-model="uploaderOpen"
      :vehicle-id="props.vehicleId"
      :type="currentDoc.type"
    />
  </div>
</template>

<style scoped>
.documents-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>
