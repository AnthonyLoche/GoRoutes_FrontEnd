<script setup>
import { RouteRetrieveComp } from '@/components';
import router from '@/router';
import { useGoRoutesStore } from '@/stores';
import { onMounted } from 'vue';
const goRoutesStore = useGoRoutesStore()

onMounted(async()=>{
    await goRoutesStore.getRoute(router.currentRoute.value.params.id)
})
</script>

<template>
    <RouteRetrieveComp />
</template>

<style scoped>
</style>