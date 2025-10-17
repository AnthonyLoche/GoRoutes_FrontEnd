<script setup>
import { onMounted } from 'vue';
import { useGoRoutesStore } from '@/stores'; 
import { TrackDriverMap, AsideToTrackDriver } from '@/components';

const goRoutesStore = useGoRoutesStore();

onMounted(async() => {
    await goRoutesStore.getActiveRoutes()
});
</script>

<template>
    <main>
        <div class="contain">
            <AsideToTrackDriver />
            <TrackDriverMap />
        </div>
    </main>
</template>

<style scoped>
main{
    margin:auto;
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
@media screen and (max-width: 1024px) {
    .contain {
        display: flex;
        flex-direction: column;
    }
}
</style>