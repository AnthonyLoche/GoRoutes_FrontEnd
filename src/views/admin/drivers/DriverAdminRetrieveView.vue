<script setup>
import { DriverRetrieveDataComp } from '@/components';
import router from '@/router';
import { useDriversStore } from '@/stores';
import { onMounted } from 'vue';
const driversStore = useDriversStore();
import Car from 'vue-material-design-icons/Car.vue';


onMounted(async () => {
    await driversStore.getDriver(router.currentRoute.value.params.id);
});
</script>

<template>
    <main>
        <h2 class="title-drivers">
            <Car />
            Dashboard de {{ driversStore.state.selectedDriver?.name }}
        </h2>
        <DriverRetrieveDataComp v-if="driversStore.state.selectedDriver" />
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