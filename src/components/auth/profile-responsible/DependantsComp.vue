<script setup>
import { ref, onMounted } from 'vue'
import ModalAddDependent from './ModalAddDependent.vue'
import HaveDependantsComp from './HaveDependantsComp.vue'
import { useDependentStore } from '@/stores'
import { useAuthStore } from '@/stores/auth/auth'

const authStore = useAuthStore()
const dependentStore = useDependentStore()
const dialog = ref(false)

function abrirFormularioEndereco() {
  dialog.value = true
}
const dependents = ref([])
onMounted(async () => {
  const response = await dependentStore.responsibleByStudentFilter(authStore.state.user.responsible_data.id)
  dependents.value = response.data
})
</script>

<template>
  <section>
    <div v-if="dependents.length > 0">
    <HaveDependantsComp :dependents="dependents" />
    </div>
     <div v-if="dependents.length == 0">
    <v-alert
      type="warning"
      variant="tonal"
      class="mt-4"
      rounded="1"
      title="ATENÇÃO"
      :closeable="false"
      :bordered="true"
    >
      <div class="alert-content">
        <span>
          Você não possui um dependende cadastrado. Por favor, cadastre um dependente para continuar.
        </span>
        <v-btn size="small" color="warning" class="ml-2" @click="abrirFormularioEndereco">
          Cadastrar agora
        </v-btn>
      </div>
    </v-alert>
    <ModalAddDependent v-model="dialog" />
    </div>
  </section>
</template>

<style scoped>
.alert-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 0.5rem;
  padding: 0.5rem 0;
}
</style>
