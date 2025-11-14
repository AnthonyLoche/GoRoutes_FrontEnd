<script setup>
import { onMounted, shallowRef } from 'vue';
import MainClosedRouteCompMinorPassenger from './MainClosedRouteCompMinorPassenger.vue';
import MainOpenedRouteCompMinorPassenger from './MainOpenedRouteCompMinorPassenger.vue';
import { useGoRoutesStore, useAuthStore } from '@/stores';

const component = shallowRef(null)
const goRoutesStore = useGoRoutesStore()
const authStore = useAuthStore()

onMounted(async() =>{
    const response = await goRoutesStore.filterMyOpenedPassengerRoute(authStore.state.user.passenger_data.id)
    console.log(response)
    if(response) {
        component.value = MainOpenedRouteCompMinorPassenger
    }else{
        component.value = MainClosedRouteCompMinorPassenger
    }
})

</script>

<template>
    <component :is="component"/>
</template>

<style scoped>
</style>