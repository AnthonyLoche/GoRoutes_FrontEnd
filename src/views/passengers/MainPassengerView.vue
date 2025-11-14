<script setup>
import OpenedRouteMinorView from './minor/OpenedRouteMinorView.vue';
import OpenedRouteOlderView from './older/OpenedRouteOlderView.vue';

import { shallowRef, ref, onMounted } from 'vue';

const view = shallowRef(null)

const isMinor = ref(true)

onMounted(()=>{
    if(isMinor.value){
        view.value = OpenedRouteMinorView
    }else{
        view.value = OpenedRouteOlderView
    }
})

</script>

<template>
    <component :is="view" />
</template>

<style scoped>
</style>