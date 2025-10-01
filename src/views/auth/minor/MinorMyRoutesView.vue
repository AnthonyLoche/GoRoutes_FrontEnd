<script setup>
import { ref, onMounted } from 'vue'
import { HeaderMain, AsideMinorComp, LoadingComp, FooterMain} from '@/components'

const isLoading = ref(true)
const hasError = ref(false)
const errorMessage = ref('')

onMounted(() => {
  try {
    console.log('ProfileResponsibleView montado')
    isLoading.value = false
  } catch (error) {
    console.error('Erro ao montar ProfileResponsibleView:', error)
    hasError.value = true
    errorMessage.value = error.message
    isLoading.value = false
  }
})
</script>

<template>
    <LoadingComp v-if="isLoading" />

    <div v-else-if="hasError" class="error-container">
        <p>Erro ao carregar a página: {{ errorMessage }}</p>
    </div>

    <div v-else class="main-default">
        <div class="header">
            <HeaderMain />
        </div>
        <div class="grid">
            <div class="aside">
                <AsideMinorComp />
            </div>
            <div class="view">
                <h1>Minhas Rotas</h1>
            </div>
        </div>
    </div>
    <FooterMain />
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
    width: 70%;
    height: 100%;
    padding: 1rem;
    overflow-y: auto;
    margin: auto;
}

/* .main-default div {
    border: 1px solid #000;
} */

@media screen and (max-width: 1024px) {
    .grid {
        display: flex;
    }
    .main-default{
        display: flex;
        flex-direction: column;
        height: auto;
    }
    .view{
        height: auto;
        width: 95%;
    }
}

.error-container {
    padding: 2rem;
    text-align: center;
    color: red;
}
</style>
