<script setup>
import { ref, watch } from 'vue'
import { useAuthStore, useVehiclesStore } from '@/stores'
import { Cropper } from 'vue-advanced-cropper'
import 'vue-advanced-cropper/dist/style.css'
import Image from 'vue-material-design-icons/Image.vue'

const emit = defineEmits(['update:modelValue'])
const props = defineProps({ modelValue: Boolean, user_id: Number, vehicle_id: Number, type: { type: String, default: 'user' } })

const file = ref(null)
const imageSrc = ref(null)
const cropperRef = ref(null)
const isOpen = ref(props.modelValue)
const authStore = useAuthStore()
const vehiclesStore = useVehiclesStore()

// Sincroniza abertura/fechamento via v-model sem mutar prop
watch(() => props.modelValue, (val) => {
  isOpen.value = val
})
watch(isOpen, (val) => {
  emit('update:modelValue', val)
})

function handleFileChange(e) {
  const selected = e.target.files[0]
  if (selected) {
    const reader = new FileReader()
    reader.onload = () => {
      imageSrc.value = reader.result
    }
    reader.readAsDataURL(selected)
    file.value = selected
  }
}

async function uploadPhoto() {
  if (!cropperRef.value) return

  const canvas = cropperRef.value.getResult().canvas
  if (!canvas) return

  const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/jpeg'))

  const formData = new FormData()
  formData.append('picture', blob)
  if (props.type === 'vehicle') {
    formData.append('vehicle_id', props.vehicle_id)
  } else {
    formData.append('user_id', props.user_id)
  }

  try {
    const reader = new FileReader()
    reader.readAsDataURL(blob)

    let response
    if (props.type === 'vehicle') {
      response = await vehiclesStore.updateVehiclePicture(formData, props.vehicle_id)
    } else {
      response = await authStore.updatePicture(formData, authStore.state.user.id)
    }
    console.log(response)
    emit('update:modelValue', false)
  } catch (error) {
    console.error('Erro ao enviar imagem:', error)
  }
}
</script>

<template>
  <v-dialog v-model="isOpen" max-width="600">
    <v-card>
      <div class="title">
        <div class="text">
          <Image />
          <h2>Alterar Foto de Perfil</h2>
        </div>
        <v-btn icon variant="text" @click="emit('update:modelValue', false)">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </div>
      <v-card-text>
        <v-file-input
          label="Selecione uma nova imagem"
          accept="image/*"
          @change="handleFileChange"
          show-size
        />

        <div v-if="imageSrc" class="cropper-wrapper">
          <Cropper
            ref="cropperRef"
            :src="imageSrc"
            :stencil-props="{ aspectRatio: 1 }"
            :autoZoom="true"
            :resizeImage="true"
          />
        </div>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn color="primary" @click="uploadPhoto" :disabled="!file">Enviar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style scoped>
.title {
  border-bottom: 2px solid var(--primary-color);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem;
}
.text {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.cropper-wrapper {
  margin-top: 1rem;
  max-height: 400px;
  overflow: hidden;
}
</style>
