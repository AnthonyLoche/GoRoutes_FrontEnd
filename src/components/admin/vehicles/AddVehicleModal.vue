<script setup>
import { ref, watch } from 'vue'
import { defineProps, defineEmits } from 'vue'
import CarIcon from 'vue-material-design-icons/Car.vue'
import { useVehiclesStore } from '@/stores'
const vehiclesStore = useVehiclesStore()

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
    plate: '',
    model: '',
    seats: null,
    picture: null,
    status: null,
})

const vehicleStatuses = [
    { text: 'Manutenção', value: 'manutenção' },
    { text: 'Disponível', value: 'disponível' },
    { text: 'Em Rota', value: 'em rota' },
]

function limparFormulario() {
    form.value = {
        plate: '',
        model: '',
        seats: null,
        picture: null,
        status: null,
    }
}

async function saveVehicle() {
    const response = await vehiclesStore.createVehicle(form.value)
    console.log(response.data)
}
</script>

<template>
    <v-dialog v-model="isDialogOpen" max-width="700" scrim="rgba(0, 0, 30, 1)" height="auto">
        <v-card class="bg-white">
            <v-card-title class="title">
                <v-icon class="mr-2" color="primary">
                    <CarIcon />
                </v-icon>
                <span>Adicionar Veículo</span>
                <v-spacer />
                <v-btn icon variant="text" @click="isDialogOpen = false">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </v-card-title>

            <v-card-text>
                <p>Adicione os dados do veículo para que possamos cadastrá-lo em nosso sistema</p>
                <v-container>
                    <v-row>
                        <v-col cols="12" md="6">
                            <v-text-field v-model="form.plate" label="Placa" outlined />
                        </v-col>
                        <v-col cols="12" md="6">
                            <v-text-field v-model="form.model" label="Modelo" outlined />
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12" md="6">
                            <v-text-field v-model="form.seats" label="Assentos" type="number" outlined />
                        </v-col>
                        <v-col cols="12" md="6">
                            <v-select
                                v-model="form.status"
                                :items="vehicleStatuses"
                                item-text="text"
                                item-value="value"
                                label="Status"
                                outlined
                            />
                        </v-col>
                    </v-row>
                </v-container>
            </v-card-text>

            <div class="edit-button full">
                <v-btn @click="limparFormulario" color="primary" variant="tonal" rounded="1">Limpar</v-btn>
                <v-btn @click="saveVehicle" color="primary" prepend-icon="mdi-content-save-outline" rounded="1">Salvar</v-btn>
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
