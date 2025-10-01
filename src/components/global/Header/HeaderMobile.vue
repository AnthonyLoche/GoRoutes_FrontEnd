<script setup>
import { computed } from 'vue'
import { useAuthStore } from '@/stores'

import HeaderMobilePassenger from './HeaderMobilePassenger.vue'
import HeaderMobileResponsible from './HeaderMobileResponsible.vue'
import HeaderMobileDriver from './HeaderMobileDriver.vue'
import HeaderMobileMinor from './HeaderMobileMinor.vue'

const authStore = useAuthStore()
const typeUser = authStore.state.type

const currentHeader = computed(() => {
  switch (typeUser) {
    case 'passenger':
      return HeaderMobilePassenger
    case 'minor':
      return HeaderMobileMinor
    case 'responsible':
      return HeaderMobileResponsible
    case 'driver':
      return HeaderMobileDriver
    default:
      return HeaderMobilePassenger
  }
})
</script>

<template>
  <component :is="currentHeader" />
</template>
