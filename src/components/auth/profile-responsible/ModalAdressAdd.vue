<script setup>
import { ref, watch, onMounted } from 'vue'
import { defineProps, defineEmits } from 'vue'
import Map from 'vue-material-design-icons/Map.vue'

const props = defineProps({
  modelValue: Boolean,
})
const emit = defineEmits(['update:modelValue'])

const isDialogOpen = ref(props.modelValue)

watch(() => props.modelValue, (val) => {
  isDialogOpen.value = val
})
watch(isDialogOpen, (val) => {
  emit('update:modelValue', val)
})

const estado = ref('SC')
const cidade = ref('')
const rua = ref('')
const numero = ref('')
const bairro = ref('')
const cep = ref('')

const cidadesSC = ref([])

onMounted(async () => {
  const response = await fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados/42/municipios')
  const data = await response.json()
  cidadesSC.value = data.map(cidade => cidade.nome).sort()
})

function limparFormulario() {
  cidade.value = ''
  rua.value = ''
  numero.value = ''
  bairro.value = ''
  cep.value = ''
}

function salvarEndereco() {
  console.log({
    estado: estado.value,
    cidade: cidade.value,
    cep: cep.value,
    rua: rua.value,
    numero: numero.value,
    bairro: bairro.value,
  })
  closeDialog()
}

function closeDialog() {
  isDialogOpen.value = false
}
</script>

<template>
  <v-dialog
    v-model="isDialogOpen"
    max-width="550"
    scrim="rgba(0, 0, 30, 1)"
  >
    <v-card class="bg-white">
      <v-card-title class="title">
        <v-icon class="mr-2" color="primary">
          <Map />
        </v-icon>
        <span>Adicionar Endereço</span>
        <v-spacer />
        <v-btn icon variant="text" @click="closeDialog">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>

      <v-card-text>
        <v-text-field label="Estado" variant="outlined" v-model="estado" readonly />
        <v-select
          label="Cidade"
          variant="outlined"
          :items="cidadesSC"
          v-model="cidade"
          clearable
        />
        <v-text-field label="CEP" variant="outlined" v-model="cep" />
        <v-text-field label="Rua" variant="outlined" v-model="rua" />
        <v-text-field label="Número" variant="outlined" v-model="numero" />
        <v-text-field label="Bairro" variant="outlined" v-model="bairro" />
      </v-card-text>

      <div class="edit-button full">
        <v-btn @click="limparFormulario" color="primary" variant="tonal" rounded="1">
          Limpar
        </v-btn>
        <v-btn @click="salvarEndereco" color="primary" prepend-icon="mdi-content-save-outline" rounded="1">
          Salvar
        </v-btn>
      </div>
    </v-card>
  </v-dialog>
</template>

<style scoped>
.title {
  border-bottom: 2px solid var(--primary-color);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.edit-button {
  display: flex;
  align-items: end;
  justify-content: end;
  width: 100%;
  gap: 1rem;
  padding: 1rem;
}

span {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>

<!-- Estilos globais para blur e dropdown -->
<style>
.v-overlay__scrim {
  backdrop-filter: blur(15px);
}

.v-select .v-overlay__content,
.v-list.v-select-list,
.v-list-item {
  background-color: white !important;
  color: black !important;
}

.v-list-item-title {
  color: black !important;
}
</style>
