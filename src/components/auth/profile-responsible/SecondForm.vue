<script setup>
import { useDependentStore, useAddressStore } from '@/stores';
const dependentStore = useDependentStore();
const addressStore = useAddressStore();

const getAddressByCep = async () => {
    const response = await addressStore.getAddressByCep(dependentStore.state.addresses[0].cep);
    console.log(response);
}
</script>

<template>
    <v-text-field label="CEP" variant="outlined" v-model="dependentStore.state.addresses[0].cep" @input="getAddressByCep" />
    <v-text-field label="Rua" variant="outlined" v-model="addressStore.state.address.logradouro" />
    <v-text-field label="Número" variant="outlined" v-model="dependentStore.state.addresses[0].number" />
    <v-text-field label="Bairro" variant="outlined" v-model="addressStore.state.address.bairro" />
    <v-text-field label="Cidade" variant="outlined" v-model="addressStore.state.address.localidade" />
    <v-text-field label="Estado" variant="outlined" v-model="addressStore.state.address.uf" />
</template>
