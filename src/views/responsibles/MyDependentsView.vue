<script setup>
import { ref, onMounted } from 'vue'
import { HeaderMain, AsideCompProfile, ProfileDataComp, LoadingComp, FooterMain, DependantsComp } from '@/components'
import AccountCircle from "vue-material-design-icons/AccountCircle.vue"


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
                <AsideCompProfile />
            </div>
            <div class="view">
                <div class="title">
          <AccountCircle />
          <h2>Dados dos Dependentes</h2>
      </div>
                <DependantsComp />
            </div>
        </div>
    </div>
    
    <FooterMain />
</template>

<style scoped>
.title{
    border-bottom: 2px solid var(--primary-color);
    display: flex;
    align-items: center;
    gap: 0.5rem;
}
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
