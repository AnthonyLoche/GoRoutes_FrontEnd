<template>
    <div class="first-form-create-route f">
        <div class="form-grid">
            <div class="form-section">
                <div class="section-header">
                    <h3>📋 Informações Básicas</h3>
                </div>
                
                <div class="form-group">
                    <label for="route-name">Nome da Rota</label>
                    <v-text-field
                        id="route-name"
                        v-model="routeData.name"
                        placeholder="Ex: Rota Sul"
                        variant="outlined"
                        hide-details
                    ></v-text-field>
                </div>
                
                <div class="form-group">
                    <label for="origin">Origem</label>
                    <v-text-field
                        id="origin"
                        v-model="routeData.origin"
                        placeholder="Endereço de origem completo"
                        variant="outlined"
                        hide-details
                    ></v-text-field>
                </div>
                
                <div class="form-group">
                    <label for="destination">Destino</label>
                    <v-text-field
                        id="destination"
                        v-model="routeData.destination"
                        placeholder="Endereço de destino completo"
                        variant="outlined"
                        hide-details
                    ></v-text-field>
                </div>
                
                <div class="form-group">
                    <label class="checkbox-label">
                        <v-checkbox
                            v-model="routeData.auto_recalculate"
                            hide-details
                        ></v-checkbox>
                        Recalcular automaticamente
                    </label>
                    <small>O sistema recalculará a rota automaticamente baseado nos passageiros</small>
                </div>
            </div>

            <div class="form-section">
                <div class="section-header">
                    <h3>🕐 Horários</h3>
                </div>
                
                <div class="time-grid">
                    <div class="form-group">
                        <label for="init-hour">Horário de Início</label>
                        <v-text-field
                            id="init-hour"
                            type="time"
                            v-model="routeData.init_hour"
                            variant="outlined"
                            hide-details
                        ></v-text-field>
                    </div>
                    
                    <div class="form-group">
                        <label for="end-hour">Horário de Fim</label>
                        <v-text-field
                            id="end-hour"
                            type="time"
                            v-model="routeData.end_hour"
                            variant="outlined"
                            hide-details
                        ></v-text-field>
                    </div>
                </div>
                
                <div class="section-header">
                    <h3>🚗 Veículo e Motorista</h3>
                </div>
                
                <div class="form-group">
                    <label for="vehicle">Veículo</label>
                 <v-select
                     id="vehicle"
                    v-model="routeData.vehicle"
                    :items="availableVehicles"
                    item-title="displayName"
                    placeholder="Selecione um veículo"
                    variant="outlined"
                    hide-details
                    :loading="vehiclesStore.state.loading"
                    return-object
                ></v-select>
                </div>
                
                <div class="form-group">
                    <label for="driver">Motorista</label>
                    <v-select
                        id="driver"
                        v-model="routeData.driver"
                        :items="availableDrivers"
                        item-title="displayName"
                        item-value="id"
                        placeholder="Selecione um motorista"
                        variant="outlined"
                        hide-details
                        :loading="driversStore.state.loading"
                    ></v-select>
                </div>
            </div>        
        </div>
    </div>
</template>

<script setup>
import { ref, watch, computed, onMounted } from 'vue'
import { useGoRoutesStore, useDriversStore, useVehiclesStore } from '@/stores'

const goRoutesStore = useGoRoutesStore()
const driversStore = useDriversStore()
const vehiclesStore = useVehiclesStore()

const routeData = ref(goRoutesStore.state_create.create_route)

const availableDrivers = computed(() => {
    return driversStore.state.drivers
        .filter(driver => driver.driver_data?.is_active)
        .map(driver => ({
            id: driver.driver_data.id,
            displayName: `${driver.name} - ${driver.driver_data.cnh}`,
            name: driver.name,
            cnh: driver.driver_data.cnh,
            cpf: driver.driver_data.cpf
        }))
})

// Computed para veículos disponíveis
const availableVehicles = computed(() => {
    return vehiclesStore.state.vehicles
        .map(vehicle => ({
            id: vehicle.id,
            displayName: `${vehicle.model} - ${vehicle.plate} (${vehicle.seats} lugares)`,
            model: vehicle.model,
            plate: vehicle.plate,
            seats: vehicle.seats,
            status: vehicle.status
        }))
})

watch(routeData, (newValue) => {
    goRoutesStore.state_create.create_route = { ...newValue }
}, { deep: true })

onMounted(async () => {
    await Promise.all([
        driversStore.getDrivers(),
        vehiclesStore.getVehicles()
    ])
})
</script>

<style scoped>
.first-form-create-route f {
    --primary: #022840;
    --primary-dark: #011a2b;
    --secondary: #0d4f6b;
    --accent: #1a73e8;
    --white: #ffffff;
    --bg-light: #f8fafc;
    --text: #334155;
    --text-light: #64748b;
    --shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
    --radius: 12px;
    --success: #10b981;
    --warning: #f59e0b;
}

.first-form-create-route f {
    min-height: 100vh;
}

.form-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
    gap: 2rem;
}

.form-section {
    background: white;
    border-radius: var(--radius);
    padding: 1rem;
    box-shadow: var(--shadow);
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
}

.form-section::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(90deg, var(--primary), var(--accent));
    transform: scaleX(0);
    transition: transform 0.3s ease;
}

.section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 0.5rem;
}

.section-header h3 {
    color: var(--primary);
    margin: 0;
    font-size: 1.2rem;
    font-weight: 600;
}

.form-group {
    margin-bottom: 1.5rem;
}

.form-group label {
    display: block;
    margin-bottom: 0.5rem;
    color: var(--text);
    font-weight: 500;
    font-size: 0.9rem;
}

.form-group input,
.form-group textarea,
.form-group select {
    width: 100%;
    padding: 0.75rem;
    border: 2px solid #e2e8f0;
    border-radius: var(--radius);
    font-size: 0.9rem;
    transition: all 0.3s ease;
    background: white;
}

.form-group input:focus,
.form-group textarea:focus,
.form-group select:focus {
    outline: none;
    border-color: var(--accent);
    box-shadow: 0 0 0 3px rgba(26, 115, 232, 0.1);
}

.form-group textarea {
    resize: vertical;
    min-height: 80px;
}

.distance-input {
    display: flex;
    gap: 0.5rem;
}

.distance-input input {
    flex: 1;
}

.calculate-btn {
    background: var(--secondary);
    color: white;
    border: none;
    border-radius: var(--radius);
    padding: 0.75rem 1rem;
    cursor: pointer;
    transition: all 0.3s ease;
    font-size: 0.8rem;
    white-space: nowrap;
}

.time-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
}

.checkbox-label {
    display: flex !important;
    align-items: center;
    gap: 0.5rem;
    cursor: pointer;
    margin-bottom: 0.5rem !important;
}

.checkbox-label input[type="checkbox"] {
    display: none;
}

.checkmark {
    width: 20px;
    height: 20px;
    border: 2px solid #e2e8f0;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
    font-size: 0.8rem;
    color: transparent;
}

.checkbox-label input[type="checkbox"]:checked + .checkmark {
    background: var(--primary);
    border-color: var(--primary);
    color: white;
}

.form-group small {
    display: block;
    color: var(--text-light);
    font-size: 0.8rem;
    margin-top: 0.25rem;
}

/* Responsivo */
@media (max-width: 768px) {
    .create-route-container {
        padding: 1rem;
    }
    
    .route-header {
        flex-direction: column;
        gap: 1rem;
        text-align: center;
    }
    
    .form-grid {
        grid-template-columns: 1fr;
    }
    
    .time-grid {
        grid-template-columns: 1fr;
    }
}

/* Ajustes para os componentes do Vuetify */
:deep(.v-text-field .v-field) {
    border-radius: var(--radius) !important;
    font-size: 0.9rem !important;
}

:deep(.v-text-field .v-field__field) {
    min-height: auto !important;
}

:deep(.v-select .v-field) {
    border-radius: var(--radius) !important;
    font-size: 0.9rem !important;
}

:deep(.v-checkbox .v-selection-control) {
    min-height: auto !important;
    margin: 0 !important;
}

:deep(.v-checkbox .v-selection-control__input) {
    margin-right: 0 !important;
}

:deep(.v-checkbox) {
    margin: 0 !important;
    padding: 0 !important;
}
</style>