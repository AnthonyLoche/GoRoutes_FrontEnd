<script setup>
import { VehicleRetrieveDataComp } from '@/components';
import router from '@/router';
import { useVehiclesStore } from '@/stores';
import { onMounted } from 'vue';
const vehiclesStore = useVehiclesStore();
import Car from 'vue-material-design-icons/Car.vue';

onMounted(async () => {
    await vehiclesStore.getVehicle(router.currentRoute.value.params.id);
});
</script>

<template>
    <main>
        <h2 class="title-drivers">
            <Car />
            Dashboard de {{ vehiclesStore.state.selectedVehicle?.model }}
        </h2>
        <VehicleRetrieveDataComp v-if="vehiclesStore.state.selectedVehicle" />
    </main>
</template>

<style>
main {
    width: 90%;
    margin: 0 auto;
}

.title-drivers {
    font-size: 2rem;
    font-weight: 600;
    color: var(--primary-color);
    margin-bottom: 2rem;
    margin-top: 2rem;
}
</style>