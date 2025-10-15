<script setup>
import { ref, watch } from 'vue'
import { defineProps, defineEmits } from 'vue'
import { useAuthStore } from '@/stores'

const props = defineProps({
  modelValue: Boolean,
})
const emit = defineEmits(['update:modelValue'])

const authStore = useAuthStore()
const isDialogOpen = ref(props.modelValue)

watch(() => props.modelValue, (val) => (isDialogOpen.value = val))
watch(isDialogOpen, (val) => emit('update:modelValue', val))

function saveChanges() {
    authStore.updateUser()
}
</script>

<template>
  <v-dialog
    v-model="isDialogOpen"
    max-width="550"
    scrim="rgba(0, 0, 30, 0.7)"
    v-if="authStore.selectedUserToUpdate"
  >
    <v-card class="bg-white">
      <v-card-title class="title">
        <span>Editar Meus Dados</span>
        <v-spacer />
        <v-btn icon variant="text" @click="isDialogOpen = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>

      <v-card-text>
        <v-text-field v-model="authStore.selectedUserToUpdate.name" label="Nome" outlined />
        <v-text-field v-model="authStore.selectedUserToUpdate.username" label="Username" outlined />
        <v-text-field v-model="authStore.selectedUserToUpdate.telephone" label="Telefone" outlined />
        <v-text-field v-model="authStore.selectedUserToUpdate.email" label="Email" outlined />
      </v-card-text>

      <v-card-actions>
        <v-spacer />
        <v-btn color="primary" variant="elevated" rounded="1" prepend-icon="mdi-content-save" @click="saveChanges">
          Salvar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style scoped>
.title {
  border-bottom: 2px solid var(--primary-color, #1976d2);
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
