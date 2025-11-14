<script setup>
import { CardVehicleAdmin, TableVehicles } from '@/components';
import Bus from 'vue-material-design-icons/Bus.vue';
import VanPassenger from 'vue-material-design-icons/VanPassenger.vue';
import CarOff from 'vue-material-design-icons/CarOff.vue';
import Car from 'vue-material-design-icons/Car.vue';

const cards = [
    {
        icon: Bus,
        text: 'Micros',
        subText: 'Gerencie os micros cadastrados',
        number: '10',
    },
    {
        icon: VanPassenger,
        text: 'Vans',
        subText: 'Gerencie as vans cadastradas',
        number: '8',
    },
    {
        icon: CarOff,
        text: 'Veículos Inativos',
        subText: 'Veículos que não estão ativos',
        number: '2',
    },
    {
        icon: Car,
        text: 'Total Ativos',
        subText: 'Total de veículos ativos',
        number: '20',
    },
];
</script>

<template>
    <main>
        <h2 class="title-drivers">
            <Car />
            Dashboard Veiculos:</h2>
        <div class="cards">
            <CardVehicleAdmin v-for="item in cards" :key="item.text" :icon="item.icon" :text="item.text" :subText="item.subText" :number="item.number" />
        </div>
        <TableVehicles />
    </main>
</template>

<style>
main {
    width: 90%;
    margin: 0 auto;
}

.cards {
    width: 100%;
    display: flex;
    gap: 1rem;
    justify-content: space-between;
}

.title-drivers {
    font-size: 2rem;
    font-weight: 600;
    color: var(--primary-color);
    margin-bottom: 2rem;
    margin-top: 2rem;
}
</style>