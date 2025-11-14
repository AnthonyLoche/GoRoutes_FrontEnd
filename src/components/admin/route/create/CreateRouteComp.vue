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

      <v-tooltip location="top">
        <template v-slot:activator="{ props }">
          <button 
            v-bind="props"
            class="save-button"
            :class="{ 'save-button--disabled': !isFormValid }"
            @click="handleSave"
            :disabled="!isFormValid"
          >
            <span style="display: flex; gap: 1rem;">
            <Download style="color: white;" />
              Salvar Rota
            </span>
          </button>
        </template>
        <span v-if="!isFormValid">Preencha todos os campos corretamente</span>
        <span v-else>Clique para salvar a rota</span>
      </v-tooltip>
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
            v-if="currentStep != 2"
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
import Download from "vue-material-design-icons/Download.vue"
import FirstFormCreateRoute from './FirstFormCreateRoute.vue'
import SecondFormCreateRoute from './SecondFormCreateRoute.vue'
import ConfirmCreateRouteComp from './ConfirmCreateRouteComp.vue'
import { useGoRoutesStore } from '@/stores'

const forms = [FirstFormCreateRoute, SecondFormCreateRoute, ConfirmCreateRouteComp]
const currentStep = ref(0)
const goRoutesStore = useGoRoutesStore()

const routeData = computed(() => goRoutesStore.state_create.create_route)

const isFormValid = computed(() => {
  const data = routeData.value
  return (
    data.name &&
    data.origin &&
    data.destination &&
    data.init_hour &&
    data.end_hour &&
    data.vehicle &&
    data.driver &&
    data.passengers_list.length >= 5
  )
})

const loading = ref(false)

const currentForm = computed(() => forms[currentStep.value])

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

const handleSave = async () => {
  if (!isFormValid.value) return
  loading.value = true
  await goRoutesStore.createRoute(goRoutesStore.state_create.create_route)

}
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.4s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

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
  color: white;
  border: none;
  border-radius: 25px;
  padding: 0.75rem 2rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(26, 115, 232, 0.3);
}

.save-button:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(26, 115, 232, 0.4);
}

.save-button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.save-button--disabled {
  background: #e2e8f0 !important;
  color: #94a3b8 !important;
  box-shadow: 0 4px 15px rgba(148, 163, 184, 0.3) !important;
}

.save-button--disabled:hover {
  transform: none !important;
  box-shadow: 0 4px 15px rgba(148, 163, 184, 0.3) !important;
}

span{
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>