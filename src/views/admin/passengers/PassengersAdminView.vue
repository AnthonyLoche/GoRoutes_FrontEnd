<script setup>
import { TablePassengers, CardPassengersAdmin } from '@/components';
import PersonIcon from 'vue-material-design-icons/Account.vue';
import PersonCheckIcon from 'vue-material-design-icons/AccountCheck.vue';
import PersonWalkingIcon from 'vue-material-design-icons/Walk.vue';
import PersonOffIcon from 'vue-material-design-icons/AccountOff.vue';
import CardAccountDetails from 'vue-material-design-icons/CardAccountDetails.vue';

const cards = [
    {
        icon: PersonIcon,
        text: 'Total de Passageiros',
        subText: 'Número total de passageiros cadastrados',
        number: '50',
    },
    {
        icon: PersonCheckIcon,
        text: 'Passageiros Ativos',
        subText: 'Passageiros atualmente ativos',
        number: '40',
    },
    {
        icon: PersonWalkingIcon,
        text: 'Passageiros em Rota',
        subText: 'Passageiros atualmente em rota',
        number: '30',
    },
    {
        icon: PersonOffIcon,
        text: 'Passageiros Inativos',
        subText: 'Passageiros que não estão ativos',
        number: '10',
    },
];
</script>

<template>
     <main>
        <h2 class="title-drivers">
            <CardAccountDetails />
            Dashboard Passageiros:</h2>
        <div class="cards">
            <CardPassengersAdmin v-for="item in cards" :key="item.text" :icon="item.icon" :text="item.text" :subText="item.subText" :number="item.number" />
        </div>
        <TablePassengers />
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