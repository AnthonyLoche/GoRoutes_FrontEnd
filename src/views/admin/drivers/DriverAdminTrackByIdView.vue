<script setup>
import { onMounted } from 'vue';
import { useGoRoutesStore } from '@/stores'; 
import { TrackDriverMapById, AsideToTrackDriver } from '@/components';

const goRoutesStore = useGoRoutesStore();

onMounted(async() => {
    await goRoutesStore.getActiveRoutes()
});
</script>

<template>
    <main>
        <div class="header">
            <h2>Rastreamento do Motorista</h2>
        </div>
        <div class="contain">
            <AsideToTrackDriver />
            <TrackDriverMapById />
        </div>
    </main>
</template>

<style scoped>
main{
    margin: 10px auto;
    width: 100%;
    display: flex;
    flex-direction: column;
}

.header {
    width: 100%;
}

.contain {
    display: grid;
    grid-template-columns: 20% 80%;
    width: 100%;
}
</style>