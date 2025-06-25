<script setup>
import { ref, watch } from 'vue'
import { defineProps, defineEmits } from 'vue'
import AccountChild from 'vue-material-design-icons/AccountChild.vue'
import FirstForm from './FirstForm.vue'
import SecondForm from './SecondForm.vue'
import ThreeForm from './ThreeForm.vue'
import { useDependentStore } from '@/stores'
const dependentStore = useDependentStore()

const props = defineProps({
    modelValue: Boolean,
})
const emit = defineEmits(['update:modelValue'])

const isDialogOpen = ref(props.modelValue)
const step = ref(1)

watch(() => props.modelValue, (val) => {
    isDialogOpen.value = val
})
watch(isDialogOpen, (val) => {
    emit('update:modelValue', val)
})

const cidade = ref('')
const rua = ref('')
const numero = ref('')
const bairro = ref('')
const cep = ref('')

function limparFormulario() {
    cidade.value = ''
    rua.value = ''
    numero.value = ''
    bairro.value = ''
    cep.value = ''
}

async function saveDependent() {
    const respose = dependentStore.registerDependent(dependentStore.state)
    console.log(respose.data)
}

function goToNextStep() {
    step.value++
}

function goToPreviousStep() {
    step.value--
}
</script>

<template>
    <v-dialog v-model="isDialogOpen" max-width="550" scrim="rgba(0, 0, 30, 1)" height="650px">
        <v-card class="bg-white">
            <v-card-title class="title">
                <v-icon class="mr-2" color="primary">
                    <AccountChild />
                </v-icon>
                <span v-if="step === 1">Adicionar Dependente - Dados Pessoais</span>
                <span v-if="step === 2">Adicionar Dependente - Endereço Principal</span>
                <span v-if="step === 3">Adicionar Dependente - Dados de Estudante</span>
                <v-spacer />
                <v-btn icon variant="text" @click="isDialogOpen = false">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </v-card-title>

            <v-card-text>
                <p>Adicione os dados do seu dependente para que possamos cadastra-lo em nosso sistema</p>
                <FirstForm v-if="step === 1" />
                <SecondForm v-if="step === 2" />
                <ThreeForm v-if="step === 3" />
            </v-card-text>

            <div class="edit-button full">
                <v-btn v-if="step === 2" @click="goToPreviousStep" color="primary" variant="tonal"
                    rounded="1">Voltar</v-btn>
                <v-btn v-if="step === 1" @click="limparFormulario" color="primary" variant="tonal"
                    rounded="1">Limpar</v-btn>
                <v-btn v-if="step === 1" @click="goToNextStep" color="primary" rounded="1">Próximo</v-btn>
                <v-btn v-if="step === 2" @click="goToNextStep" color="primary" rounded="1">Próximo</v-btn>
                <v-btn v-if="step === 3" @click="goToPreviousStep" color="primary" variant="tonal"
                    rounded="1">Voltar</v-btn>
                <v-btn v-if="step === 3" @click="saveDependent" color="primary" prepend-icon="mdi-content-save-outline"
                    rounded="1">Salvar</v-btn>
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
