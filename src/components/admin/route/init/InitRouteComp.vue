<template>
  <div class="create-route-container">
    <!-- Cabeçalho -->
    <div class="route-header">
      <div class="header-content">
        <div class="header-icon">
          <Map size="50" />
        </div>
        <div>
          <h1>Iniciar Uma Rota Diária</h1>
        </div>
      </div>
      <div class="buttons_original">
        <v-btn 
        rounded="1" 
        size="large" 
        variant="elevated" 
        :disabled="goRoutesStore.state_create.daily_route.original"
        @click="goRoutesStore.setDailyRouteOriginal(true)"
        >
        Original
      </v-btn>
      
        <v-btn 
        rounded="1" 
        size="large" 
        variant="tonal" 
        :disabled="!goRoutesStore.state_create.daily_route.original"
         @click="goRoutesStore.setDailyRouteOriginal(false)"
        >
        Não Original
      </v-btn>
      </div>
    </div>

    <transition name="fade" mode="out-in">
      <div :key="currentStep">
        <component 
          :is="currentForm" 
        />
        <div class="navigation-buttons">
          <v-btn 
            color="error" 
            @click="nextForm" 
            rounded="1"
            append-icon="mdi-arrow-right"
            size="large"
            :width="isMobile() ? '100%' : 'auto'"
          >
            INICIAR ROTA
          </v-btn>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, computed, onUnmounted, onMounted } from 'vue'
import Map from 'vue-material-design-icons/Map.vue'
import SecondFormInitRoute from './SecondFormInitRoute.vue'
import { useGoRoutesStore } from '@/stores'

const forms = [SecondFormInitRoute]
const currentStep = ref(0)
const goRoutesStore = useGoRoutesStore()

const currentForm = computed(() => forms[currentStep.value])

const nextForm = () => {
  if(currentStep.value < forms.length - 1){
    currentStep.value++
  }
}

const windowWidth = ref(window.innerWidth)

const handleResize = () => {
  windowWidth.value = window.innerWidth
}

onMounted(() => {
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})

const isMobile = () => windowWidth.value <= 1024
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

.create-route-container {
  width: 80%;
  --primary: #022840;
  --accent: #1a73e8;
  margin: 0 auto;
  padding: 2rem;
  font-family: 'Poppins', sans-serif;
}

.route-header {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  margin-bottom: .5rem;
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

.buttons_original{
  display: flex;
  gap: 1rem;
}

span{
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
