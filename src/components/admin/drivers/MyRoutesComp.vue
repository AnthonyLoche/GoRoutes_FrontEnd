<script setup>
import { computed, onMounted } from "vue"
import Map from "vue-material-design-icons/Map.vue"
import MapMarkerCheck from "vue-material-design-icons/MapMarkerCheck.vue"
import MapMarkerRemoveVariant from "vue-material-design-icons/MapMarkerRemoveVariant.vue"
import Car from "vue-material-design-icons/Car.vue"
import AccountGroup from "vue-material-design-icons/AccountGroup.vue"
import MapMarkerDistance from "vue-material-design-icons/MapMarkerDistance.vue"
import Navigation from "vue-material-design-icons/Navigation.vue"
import MapMarker from "vue-material-design-icons/MapMarker.vue"
import { useGoRoutesStore, useAuthStore } from "@/stores"

const goRoutesStore = useGoRoutesStore()
const authStore = useAuthStore()

onMounted(async () => {
    await goRoutesStore.filterMyDriverRoutes()
})

const routes = computed(() =>
    goRoutesStore.state.myDriverRoutes.map(route => ({
        ...route,
        status: route.is_active ? "active" : "inactive",
        distanceKm: (route.distance / 1000).toFixed(1) + " km",
        passengersCount: route.passengers.length,
        vehicleModel: route.vehicle?.model || "Sem veículo"
    }))
)
</script>

<template>
    <div class="routes-container">
        <div class="page-header">
            <div class="header-content">
                <Map :size="32" class="header-icon" />
                <h2 class="page-title">Minhas Rotas</h2>
            </div>
            <div class="header-stats">
                <div class="stat-item">
                    <span class="stat-number">{{routes.filter(r => r.status === 'active').length}}</span>
                    <span class="stat-label">Ativas</span>
                </div>
                <div class="stat-item">
                    <span class="stat-number">{{ routes.length }}</span>
                    <span class="stat-label">Total</span>
                </div>
            </div>
        </div>

        <div class="routes-grid">
            <v-card v-for="route in routes" :key="route.id" class="route-card" elevation="2"
                :class="{ 'inactive-route': route.status === 'inactive' }">
                <v-card-title class="card-header">
                    <div class="route-status">
                        <MapMarkerCheck v-if="route.status === 'active'" :size="24" class="status-icon active" />
                        <MapMarkerRemoveVariant v-else :size="24" class="status-icon inactive" />
                    </div>
                    <div class="route-name">
                        <h3>{{ route.name }}</h3>
                    </div>
                </v-card-title>

                <v-card-text class="card-content">
                    <div class="route-details-grid">
                        <!-- Linha 1 -->
                        <div class="detail-item">
                            <Navigation :size="20" class="detail-icon" />
                            <div class="detail-content">
                                <div class="detail-label">Origem</div>
                                <div class="detail-value">{{ route.origin }}</div>
                            </div>
                        </div>

                        <div class="detail-item">
                            <MapMarker :size="20" class="detail-icon" />
                            <div class="detail-content">
                                <div class="detail-label">Destino</div>
                                <div class="detail-value">{{ route.destination }}</div>
                            </div>
                        </div>

                        <div class="detail-item">
                            <MapMarkerDistance :size="20" class="detail-icon" />
                            <div class="detail-content">
                                <div class="detail-label">Distância</div>
                                <div class="detail-value">{{ route.distanceKm }}</div>
                            </div>
                        </div>

                        <!-- Linha 2 -->
                        <div class="detail-item">
                            <AccountGroup :size="20" class="detail-icon" />
                            <div class="detail-content">
                                <div class="detail-label">Passageiros</div>
                                <div class="detail-value">{{ route.passengersCount }}</div>
                            </div>
                        </div>

                        <div class="detail-item">
                            <Car :size="20" class="detail-icon" />
                            <div class="detail-content">
                                <div class="detail-label">Veículo</div>
                                <div class="detail-value">{{ route.vehicleModel }}</div>
                            </div>
                        </div>

                        <div class="detail-item">
                            <!-- Espaço reservado ou futuro campo -->
                        </div>
                    </div>
                </v-card-text>

                <v-card-actions class="card-actions">
                    <v-btn variant="elevated" color="primary" size="small" rounded="xs" prepend-icon="mdi-map-marker" class="solid-btn">
                        Editar
                    </v-btn>
                    <v-btn variant="elevated" color="primary" size="small" rounded="xs" prepend-icon="mdi-map-marker-check" class="solid-btn">
                        Ver Detalhes
                    </v-btn>
                    <v-spacer />
                    <v-btn variant="elevated" color="error" rounded="xs" prepend-icon="mdi-navigation" class="solid-btn">
                        INICIAR ROTA
                    </v-btn>
                </v-card-actions>
            </v-card>
        </div>
    </div>
</template>

<style scoped>
.routes-container {
    padding: 1.5rem;
    max-width: 1200px;
    margin: 0 auto;
}

.solid-btn{
    padding: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
}

.page-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
    border-bottom: 3px solid rgb(var(--v-theme-primary));
}

.header-content {
    display: flex;
    align-items: center;
    gap: 1rem;
}

.header-icon {
    color: rgb(var(--v-theme-primary));
}

.page-title {
    margin: 0;
    font-size: 1.75rem;
    font-weight: 600;
    color: rgb(var(--v-theme-on-background));
}

.header-stats {
    display: flex;
    gap: 2rem;
}

.stat-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
}

.stat-number {
    font-size: 1.5rem;
    font-weight: 700;
    color: rgb(var(--v-theme-primary));
}

.stat-label {
    font-size: 0.875rem;
    color: rgb(var(--v-theme-on-surface-variant));
    margin-top: 0.25rem;
}

.routes-grid {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
}

.route-card {
    transition: all 0.3s ease;
    border-radius: 12px !important;
}

.route-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1) !important;
}

.inactive-route {
    opacity: 0.8;
}

.card-header {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1.25rem 1.25rem 0.75rem 1.25rem !important;
}

.route-status {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background-color: rgba(var(--v-theme-surface-variant), 0.3);
}

.status-icon.active {
    color: rgb(var(--v-theme-success));
}

.status-icon.inactive {
    color: rgb(var(--v-theme-warning));
}

.route-name {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.route-name h3 {
    margin: 0;
    font-size: 1.25rem;
    font-weight: 600;
    color: rgb(var(--v-theme-on-surface));
}

.card-content {
    padding: 0.75rem 1.25rem !important;
}

.route-details-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem 1.5rem;
    margin-top: 0.5rem;
}

.detail-item {
    display: flex;
    align-items: flex-start;
    gap: 0.75rem;
}

.detail-icon {
    color: rgb(var(--v-theme-primary));
    flex-shrink: 0;
}

.detail-content {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.25rem;
    min-width: 0;
}

.detail-label {
    font-size: 0.75rem;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.5px;
}

.detail-value {
    font-size: 0.875rem;
    font-weight: 500;
    display: flex;
    align-items: center;
    word-wrap: break-word;
}

.card-actions {
    padding: 0.75rem 1.25rem 1.25rem 1.25rem !important;
}

@media screen and (max-width:1024px) {
    .routes-container {
        width: 90%;
        padding: 0;
    }

    .route-details-grid {
        display: flex;
        flex-direction: column;
    }

    .card-actions{
        flex-direction: column;
        gap: 0.5rem;
        padding: 0;
        align-items: flex-start;
    }
}
</style>