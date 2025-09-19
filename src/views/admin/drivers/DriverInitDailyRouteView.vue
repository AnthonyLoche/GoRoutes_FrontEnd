<script setup>
import { InitRouteComp } from '@/components';
import { onMounted } from 'vue';
import { useGoRoutesStore } from '@/stores';

import router from '@/router';
const goRoutesStore = useGoRoutesStore();

onMounted(async () => {
    await goRoutesStore.getRouteByIdToInit(router.currentRoute.value.params.id);
});
</script>

<template>
    <InitRouteComp />
    <main></main>
</template>