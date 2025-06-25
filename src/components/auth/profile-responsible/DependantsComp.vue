<script setup>
import { ref } from 'vue'
import ModalAddDependent from './ModalAddDependent.vue'

const dialog = ref(false)

function abrirFormularioEndereco() {
  dialog.value = true
}
</script>

<template>
  <section>
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
