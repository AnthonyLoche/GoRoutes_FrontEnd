<script setup>
import { useAddressStore } from '@/stores';
const addressStore = useAddressStore();

const getAddressByCep = async () => {
    console.log(addressStore.state.cep);
    const response = await addressStore.getAddressByCep(addressStore.state.cep);
    console.log(response);
}
</script>

<template>
    <v-text-field label="CEP" variant="outlined" v-model="addressStore.state.cep" @input="getAddressByCep" />
    <v-text-field label="Rua" variant="outlined" v-model="addressStore.state.logradouro" />
    <v-text-field label="Número" variant="outlined" v-model="addressStore.state.number" />
    <v-text-field label="Bairro" variant="outlined" v-model="addressStore.state.bairro" />
    <v-text-field label="Cidade" variant="outlined" v-model="addressStore.state.localidade" />
    <v-text-field label="Estado" variant="outlined" v-model="addressStore.state.uf" />
</template>
