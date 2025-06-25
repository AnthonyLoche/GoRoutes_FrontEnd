<script setup>
import { useDependentStore } from '@/stores';
const dependentStore = useDependentStore();
</script>

<template>
    <v-text-field label="Nome" variant="outlined" v-model="dependentStore.state.user.name" />
    <v-text-field label="Username" variant="outlined" clearable v-model="dependentStore.state.user.username" />
    <v-text-field label="Email" v-model="dependentStore.state.user.email" />
    <v-text-field label="Senha" v-model="dependentStore.state.user.password" />
    <v-text-field label="Telefone" variant="outlined" v-model="dependentStore.state.user.telephone" />
    <v-text-field label="CPF" variant="outlined" v-model="dependentStore.state.cpf" />
    <v-text-field type="date" label="Data de Nascimento" variant="outlined" v-model="dependentStore.state.user.data_of_birth" />
</template>
