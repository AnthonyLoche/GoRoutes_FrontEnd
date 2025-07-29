<script setup>
import { CardAdminDriver, TableDrivers } from '@/components';
import Account from 'vue-material-design-icons/Account.vue';

const cards = [
    {
        icon: Account,
        text: 'Motoristas',
        subText: 'Gerencie os motoristas cadastrados',
        number: '10',
    },
    {
        icon: Account,
        text: 'Motoristas Ativos',
        subText: 'Motoristas atualmente ativos',
        number: '8',
    },
    {
        icon: Account,
        text: 'Motoristas Inativos',
        subText: 'Motoristas que não estão ativos',
        number: '2',
    },
];
</script>

<template>
    <main>
        <h2 class="title-drivers">Dashboard Motoristas:</h2>
        <div class="cards">
            <CardAdminDriver v-for="item in cards" :key="item.id" :icon="item.icon" :text="item.text" :subText="item.subText" :number="item.number" />
        </div>
        <TableDrivers />
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