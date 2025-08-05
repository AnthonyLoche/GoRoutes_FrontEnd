<script setup>
import router from '@/router';
import { useDriversStore } from '@/stores'; 
import { onMounted } from 'vue';
const driversStore = useDriversStore();


onMounted(async() => {
    await driversStore.getDriver(router.currentRoute.value.params.id);
});
</script>

<template>
    <main>
        <div>
            <h1>Rastreamento de {{ driversStore.state.selectedDriver?.name }}</h1>
        </div>
    </main>
</template>

<style scoped>
main{
    margin: 20px auto;
    width: 90%;
}
</style>