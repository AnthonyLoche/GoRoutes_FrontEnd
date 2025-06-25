<script setup>
import { useDependentStore } from '@/stores';
const dependentStore = useDependentStore();
</script>

<template>
    <v-text-field label="Turma" variant="outlined" v-model="dependentStore.state.student_data.grade" />
    <v-text-field label="Matricula" variant="outlined" clearable
        v-model="dependentStore.state.student_data.registration" />
</template>
