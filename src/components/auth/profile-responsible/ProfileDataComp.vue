<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores';
import AccountCircle from "vue-material-design-icons/AccountCircle.vue"
import DataComp from "./DataComp.vue";
import DependantsComp from "./DependantsComp.vue";
import AccountChild from "vue-material-design-icons/AccountChild.vue";
import { LoadingComp } from '@/components';

const router = useRouter();
const authStore = useAuthStore();
const isLoading = ref(true);
const hasError = ref(false);

onMounted(async () => {
  try {
    isLoading.value = true;
    // Verifica se o usuário está autenticado e é um responsável
    if (!authStore.state.isLogged || authStore.state.type !== 'responsible') {
      router.push('/blank/login');
      return;
    }

    // Atualiza os dados do usuário
    if (authStore.state.user?.id) {
      await authStore.refreshDataUser(authStore.state.user.id);
    }

    isLoading.value = false;
  } catch (error) {
    console.error('Erro ao carregar dados do perfil:', error);
    hasError.value = true;
    isLoading.value = false;
  }
});
</script>

<template>
  <section>
    <LoadingComp v-if="isLoading" />

    <div v-else-if="hasError" class="error-message">
      <p>Ocorreu um erro ao carregar os dados. Por favor, tente novamente mais tarde.</p>
    </div>

    <div v-else>
      <div class="title">
          <AccountCircle />
          <h2>Dados do Perfil</h2>
      </div>
      <DataComp />
      <div class="title">
          <AccountChild />
          <h2>Dependentes:</h2>
      </div>
      <DependantsComp />
    </div>
  </section>
</template>


<style scoped>
.title{
    border-bottom: 2px solid var(--primary-color);
    display: flex;
    gap: 0.5rem;
}

span{
    display: flex;
    align-items: center;
    justify-content: center;
}
@media (max-width: 1024px) {
  section{
    width: 100%;
  }
  .title h2{
        font-size: 1.2rem;
    }
}

.error-message {
  text-align: center;
  padding: 2rem;
  color: var(--error-color);
  background-color: var(--error-bg-color);
  border-radius: 8px;
  margin: 1rem 0;
}
</style>
