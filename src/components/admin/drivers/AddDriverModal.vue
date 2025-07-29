<script setup>
import { ref, watch } from 'vue'
import { defineProps, defineEmits } from 'vue'
import CardAccountDetails from 'vue-material-design-icons/CardAccountDetails.vue'
import { useDriversStore } from '@/stores'
const driversStore = useDriversStore()

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

const form = ref({
    cnh: '',
    cpf: '',
    user: {
        username: '',
        name: '',
        email: '',
        password: '',
        telephone: '',
        data_of_birth: '',
    },
    addresses: [
        {
            cep: '',
            street: '',
            number: '',
            complement: '',
            neighborhood: '',
            city: '',
            state: '',
        },
    ],
})

function limparFormulario() {
    form.value = {
        cnh: '',
        cpf: '',
        user: {
            username: '',
            name: '',
            email: '',
            password: '',
            telephone: '',
            data_of_birth: '',
        },
        addresses: [
            {
                cep: '',
                street: '',
                number: '',
                complement: '',
                neighborhood: '',
                city: '',
                state: '',
            },
        ],
    }
}

async function saveDriver() {
    const response = await driversStore.createDriver(form.value)
    console.log(response.data)
}
</script>

<template>
    <v-dialog v-model="isDialogOpen" max-width="700" scrim="rgba(0, 0, 30, 1)" height="auto">
        <v-card class="bg-white">
            <v-card-title class="title">
                <v-icon class="mr-2" color="primary">
                    <CardAccountDetails />
                </v-icon>
                <span>Adicionar Motorista</span>
                <v-spacer />
                <v-btn icon variant="text" @click="isDialogOpen = false">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </v-card-title>

            <v-card-text>
                <p>Adicione os dados do motorista para que possamos cadastrá-lo em nosso sistema</p>
                <v-container>
                    <v-row>
                        <v-col cols="12" md="6">
                            <v-text-field v-model="form.user.name" label="Nome" outlined />
                            <v-text-field v-model="form.user.email" label="Email" outlined />
                            <v-text-field v-model="form.cnh" label="CNH" outlined />
                            <v-text-field v-model="form.cpf" label="CPF" outlined />
                            <v-text-field v-model="form.user.username" label="Usuário" outlined />
                            <v-text-field v-model="form.user.password" label="Senha" type="password" outlined />
                            <v-text-field v-model="form.user.telephone" label="Telefone" outlined />
                            <v-text-field v-model="form.user.data_of_birth" label="Data de Nascimento" type="date" outlined />
                        </v-col>
                        <v-col cols="12" md="6">
                            <v-text-field v-model="form.addresses[0].cep" label="CEP" outlined />
                            <v-text-field v-model="form.addresses[0].street" label="Rua" outlined />
                            <v-text-field v-model="form.addresses[0].number" label="Número" outlined />
                            <v-text-field v-model="form.addresses[0].complement" label="Complemento" outlined />
                            <v-text-field v-model="form.addresses[0].neighborhood" label="Bairro" outlined />
                            <v-text-field v-model="form.addresses[0].city" label="Cidade" outlined />
                            <v-text-field v-model="form.addresses[0].state" label="Estado" outlined />
                        </v-col>
                    </v-row>
                </v-container>
            </v-card-text>

            <div class="edit-button full">
                <v-btn @click="limparFormulario" color="primary" variant="tonal" rounded="1">Limpar</v-btn>
                <v-btn @click="saveDriver" color="primary" prepend-icon="mdi-content-save-outline" rounded="1">Salvar</v-btn>
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
