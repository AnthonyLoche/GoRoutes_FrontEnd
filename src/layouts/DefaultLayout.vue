<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { RouterView } from 'vue-router'
import { HeaderMain, AsideMain, FooterMain } from '@/components'

// Estado reativo da largura da janela
const width = ref(window.innerWidth)

// Função para atualizar largura
const handleResize = () => {
  width.value = window.innerWidth
}

// Escuta eventos ao montar e remove ao desmontar
onMounted(() => {
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})
</script>

<template>
  <div class="main-default">
    <div class="header">
      <HeaderMain />
    </div>
    <div class="grid">
      <div class="aside">
        <AsideMain />
      </div>
      <div class="view">
        <RouterView />
      </div>
    </div>
  </div>

  <!-- Footer aparece apenas se a largura for >= 1024px -->
  <FooterMain v-if="width >= 1024" />
</template>

<style scoped>
.main-default {
  display: grid;
  grid-template-rows: 10% 90%;
  height: 100vh;
}

.header {
  width: 100%;
  height: 100%;
}

.grid {
  display: grid;
  grid-template-columns: 13% 87%;
}

.view {
  overflow-y: auto;
}

@media screen and (max-width: 1024px) {
  .grid {
    display: flex;
    flex-direction: column;
    margin-top: 3rem;
  }

  .aside {
    display: none;
  }

  .main-default {
    display: flex;
    flex-direction: column;
  }
}
</style>
