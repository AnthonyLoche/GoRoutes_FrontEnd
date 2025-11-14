<script setup>
import { RouterView } from 'vue-router'
import LoadingComp from './components/global/LoadingComp.vue'

import { onMounted } from 'vue'
import { useGoRoutesStore } from '@/stores'

const goRoutesStore = useGoRoutesStore()


onMounted(async () => {
  await goRoutesStore.getActiveRoutes();
});
</script>

<template>
  <RouterView />
  <LoadingComp />
</template>

<style scoped>
</style>
