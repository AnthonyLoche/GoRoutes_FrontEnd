<script setup>
import CardAccountDetails from 'vue-material-design-icons/CardAccountDetails.vue';
</script>

<template>
    <main>
        <h2 class="title-drivers">
            <CardAccountDetails />
            Dashboard de Responsáveis:</h2>
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