<script setup>
import { TableRoutes, CardListRoute } from '@/components';
import RouteIcon from 'vue-material-design-icons/Map.vue';
import RouteCheckIcon from 'vue-material-design-icons/MapCheck.vue';
import RouteWalkingIcon from 'vue-material-design-icons/MapMarkerPath.vue';
import RouteOffIcon from 'vue-material-design-icons/MapMarkerOff.vue';
import CardAccountDetails from 'vue-material-design-icons/CardAccountDetails.vue';
import { ref, onMounted } from 'vue';
import { useGoRoutesStore } from '@/stores';

const goRoutesStore = useGoRoutesStore();

const cards = ref([
    {
        icon: RouteIcon,
        text: 'Total de Rotas',
        subText: 'Número total de rotas',
        number: '0',
    },
    {
        icon: RouteCheckIcon,
        text: 'Rotas Ativas',
        subText: 'Rotas atualmente ativas',
        number: '0',
    },
    {
        icon: RouteWalkingIcon,
        text: 'Rotas em Andamento',
        subText: 'Rotas sendo executadas agora',
        number: '0',
    },
    {
        icon: RouteOffIcon,
        text: 'Rotas Inativas',
        subText: 'Rotas que não estão ativas',
        number: '0',
    },
]);

// Atualizar cards com dados reais
const updateCards = () => {
    const routes = goRoutesStore.state.routes;
    const total = routes.length;
    const active = routes.filter(route => route.is_active).length;
    const inProgress = routes.filter(route => route.driver && route.is_active).length;
    const inactive = total - active;

    cards.value[0].number = total.toString();
    cards.value[1].number = active.toString();
    cards.value[2].number = inProgress.toString();
    cards.value[3].number = inactive.toString();
};

onMounted(async () => {
    await goRoutesStore.getRoutes();
    updateCards();
});
</script>

<template>
     <main>
        <h2 class="title-routes">
            <CardAccountDetails />
            Dashboard de Rotas
        </h2>
        <div class="cards">
            <CardListRoute v-for="item in cards" :key="item.text" :icon="item.icon" :text="item.text" :subText="item.subText" :number="item.number" />
        </div>
        <TableRoutes />
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

.title-routes {
    font-size: 2rem;
    font-weight: 600;
    color: var(--primary-color);
    margin-bottom: 2rem;
    margin-top: 2rem;
}

@media (max-width: 768px) {
    .cards {
        flex-direction: column;
    }
    
    main {
        width: 95%;
    }
}
</style>