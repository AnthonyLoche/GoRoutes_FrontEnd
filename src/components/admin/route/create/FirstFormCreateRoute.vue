    <template>
    <div class="first-form-create-route f">

        <div class="form-grid">
        <div class="form-section">
            <div class="section-header">
            <h3>📋 Informações Básicas</h3>
            </div>
            <div class="form-group">
            <label for="route-name">Nome da Rota</label>
            <input 
                id="route-name"
                type="text" 
                v-model="routeData.name"
                placeholder="Ex: Rota Sul"
            />
            </div>
            <div class="form-group">
            <label for="origin">Origem</label>
            <input 
                id="origin"
                v-model="routeData.origin"
                placeholder="Endereço de origem completo"
            />
            </div>
            <div class="form-group">
            <label for="destination">Destino</label>
            <input 
                id="destination"
                v-model="routeData.destination"
                placeholder="Endereço de destino completo"
            />
            </div>
           
            <div class="form-group">
            <label class="checkbox-label">
                <input 
                type="checkbox" 
                v-model="routeData.auto_recalculate"
                />
                <span class="checkmark">✓</span>
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
                <input 
                id="init-hour"
                type="time" 
                v-model="routeData.init_hour"
                />
            </div>
            <div class="form-group">
                <label for="end-hour">Horário de Fim</label>
                <input 
                id="end-hour"
                type="time" 
                v-model="routeData.end_hour"
                />
            </div>
            </div>
            
   <div class="section-header">
            <h3>🚗 Veículo e Motorista</h3>
            </div>
            <div class="form-group">
            <label for="vehicle">Veículo</label>
            <select 
                id="vehicle"
                v-model="routeData.vehicle"
            >
                <option value="">Selecione um veículo</option>
                <option 
                v-for="vehicle in mockVehicles" 
                :key="vehicle.id" 
                :value="vehicle.id"
                >
                {{ vehicle.name }}
                </option>
            </select>
            </div>
            <div class="form-group">
            <label for="driver">Motorista</label>
            <select 
                id="driver"
                v-model="routeData.driver"
            >
                <option value="">Selecione um motorista</option>
                <option 
                v-for="driver in mockDrivers" 
                :key="driver.id" 
                :value="driver.id"
                >
                {{ driver.name }}
                </option>
            </select>
            </div>
        </div>        
        </div>
    </div>
    </template>

    <script setup>
    import { ref } from 'vue'

    const routeData = ref({
    name: "Rota Sul",
    origin: "Avenida Rolf Wiest, 333 - Bom Retiro, Joinville - SC, 89223-005",
    destination: "BR-280 - Colégio Agrícola, 5200, Araquari - SC, 89245-000",
    distance: 0,
    init_hour: "07:00",
    end_hour: "07:45",
    passengers_list: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
    auto_recalculate: true,
    vehicle: 1,
    driver: 1
    })


    const mockVehicles = ref([
    { id: 1, name: 'Van Mercedes - ABC1234' },
    { id: 2, name: 'Ônibus Volkswagen - DEF5678' },
    { id: 3, name: 'Micro-ônibus Iveco - GHI9012' }
    ])

    const mockDrivers = ref([
    { id: 1, name: 'João Silva' },
    { id: 2, name: 'Maria Santos' },
    { id: 3, name: 'Pedro Oliveira' }
    ])

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
    padding: 2rem;
    min-height: 100vh;
    font-family: 'Poppins', -apple-system, BlinkMacSystemFont, sans-serif;
    }

    .form-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
    gap: 2rem;
    margin-bottom: 2rem;
    }

    .form-section {
    background: white;
    border-radius: var(--radius);
    padding: 2rem;
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
    margin-bottom: 1.5rem;
    padding-bottom: 0.5rem;
    border-bottom: 2px solid var(--bg-light);
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
    background: linear-gradient(135deg, var(--primary), var(--accent));
    border-color: var(--accent);
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
    </style>