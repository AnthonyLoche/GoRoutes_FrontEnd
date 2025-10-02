<template>
  <div class="create-route-container">
    <!-- Cabeçalho -->
    <div class="route-header">
      <div class="header-content">
        <div class="header-icon">
          <Map size="50" />
        </div>
        <div>
          <h1>Criar Nova Rota</h1>
        </div>
      </div>

      <!-- Botão de salvar -->
      <button 
        class="save-button"
        @click="handleSave"
        :disabled="loading"
      >
        <span v-if="loading">💾 Salvando...</span>
        <span v-else>💾 Salvar Rota</span>
      </button>
    </div>

    <transition name="fade" mode="out-in">
      <div :key="currentStep">
        <component 
          :is="currentForm" 
          :route-data="routeData"
        />
        <div class="navigation-buttons">
          <v-btn 
          variant="tonal" 
            @click="prevForm" 
            :disabled="currentStep === 0"
            rounded="1"
            prepend-icon="mdi-arrow-left"
          >
            Voltar
          </v-btn>
          <v-btn 
            color="primary" 
            @click="nextForm" 
            :disabled="currentStep === forms.length - 1"
            rounded="1"
            append-icon="mdi-arrow-right"
          >
            Próximo
          </v-btn>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import Map from 'vue-material-design-icons/Map.vue'
import FirstFormCreateRoute from './FirstFormCreateRoute.vue'
import SecondFormCreateRoute from './SecondFormCreateRoute.vue'

// Lista de formulários
const forms = [FirstFormCreateRoute, SecondFormCreateRoute]
const currentStep = ref(0)

// Dados da rota compartilhados entre formulários
const routeData = ref({
  name: "Rota Sul",
  origin: "Avenida Rolf Wiest, 333 - Bom Retiro, Joinville - SC, 89223-005",
  destination: "BR-280 - Colégio Agrícola, 5200, Araquari - SC, 89245-000",
  distance: 0,
  init_hour: "07:00",
  end_hour: "07:45",
  passengers_list: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15],
  auto_recalculate: true,
  vehicle: 1,
  driver: 1
})

const loading = ref(false)

// Computed para o formulário atual
const currentForm = computed(() => forms[currentStep.value])

// Funções para navegação
const nextForm = () => {
  if(currentStep.value < forms.length - 1){
    currentStep.value++
  }
}

const prevForm = () => {
  if(currentStep.value > 0){
    currentStep.value--
  }
}

// Função para salvar
const handleSave = async () => {
  loading.value = true
  setTimeout(() => {
    loading.value = false
    alert('Rota criada com sucesso!')
    console.log('Dados da rota:', routeData.value)
  }, 2000)
}
</script>

<style scoped>
/* Transição suave */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.4s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

/* Botões de navegação */
.navigation-buttons {
  display: flex;
  justify-content: flex-end;
  margin-top: 2rem;
    gap: 1rem;
}

.nav-button {
  background: linear-gradient(135deg, #022840, #1a73e8);
  color: white;
  border: none;
  border-radius: 25px;
  padding: 0.6rem 1.5rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(26, 115, 232, 0.3);
}

.nav-button:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(26, 115, 232, 0.4);
}

.nav-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* Mantendo o CSS existente para container e header */
.create-route-container {
  --primary: #022840;
  --accent: #1a73e8;
  padding: 2rem;
  min-height: 100vh;
  font-family: 'Poppins', sans-serif;
}

.route-header {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  margin-bottom: 1rem;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  overflow: hidden;
}

.route-header::before {
  content: '';
  position: absolute;
  top:0; left:0; right:0;
  height:4px;
  background: linear-gradient(90deg, var(--primary), var(--accent));
}

.header-content {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.save-button {
  background: linear-gradient(135deg, var(--primary), var(--accent));
  color:white;
  border:none;
  border-radius:25px;
  padding:0.75rem 2rem;
  font-weight:600;
  cursor:pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow:hidden;
  box-shadow:0 4px 15px rgba(26,115,232,0.3);
}

.save-button:disabled {
  opacity:0.7;
  cursor:not-allowed;
}

span{
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
