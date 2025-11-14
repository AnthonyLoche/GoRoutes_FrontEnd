<script setup>
import { ref } from 'vue'
import { useVehiclesStore } from '@/stores'

const props = defineProps({
  modelValue: Boolean,
  type: String,
  vehicleId: Number
})
const emit = defineEmits(['update:modelValue'])
const vehiclesStore = useVehiclesStore()

const file = ref(null)

async function upload() {
  if (!file.value) return

  const formData = new FormData()
  formData.append("document_type", props.type)
  formData.append("vehicle_id", props.vehicleId)
  formData.append("document", file.value)

  try {
    // aqui você faria a request pro backend
    await vehiclesStore.updateDocumentVehicle(formData)

    emit('update:modelValue', false)
  } catch (e) {
    console.error("Erro ao enviar documento:", e)
  }
}
</script>

<template>
  <v-dialog v-model="props.modelValue" max-width="600">
    <v-card>
      <div class="title">
        <h2>Enviar {{ props.type }}</h2>
      </div>
      <v-card-text>
        <v-file-input
          label="Selecione o documento"
          accept="image/*,.pdf"
          v-model="file"
        />
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn text @click="emit('update:modelValue', false)">Cancelar</v-btn>
        <v-btn color="primary" :disabled="!file" @click="upload">Enviar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style scoped>
.title {
  border-bottom: 2px solid var(--primary-color);
  padding: .5rem;
}
</style>
