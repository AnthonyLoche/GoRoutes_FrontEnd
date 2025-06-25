<script setup>
import { useDependentStore } from '@/stores';
const dependentStore = useDependentStore();
</script>

<template>
    <v-text-field label="CEP" variant="outlined" v-model="dependentStore.state.addresses[0].cep" />
    <v-text-field label="Rua" variant="outlined" v-model="dependentStore.state.addresses[0].street" />
    <v-text-field label="Número" variant="outlined" v-model="dependentStore.state.addresses[0].number" />
    <v-text-field label="Bairro" variant="outlined" v-model="dependentStore.state.addresses[0].neighborhood" />
    <v-text-field label="Cidade" variant="outlined" v-model="dependentStore.state.addresses[0].city" />
</template>
