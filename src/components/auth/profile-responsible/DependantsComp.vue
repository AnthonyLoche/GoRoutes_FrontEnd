<script setup>
import { ref, onMounted, computed } from 'vue'
import ModalAddDependent from './ModalAddDependent.vue'
import HaveDependantsComp from './HaveDependantsComp.vue'
import { useDependentStore } from '@/stores'
import { useAuthStore } from '@/stores/auth/auth'

const authStore = useAuthStore()
const dependentStore = useDependentStore()
const dialog = ref(false)
const isLoading = ref(false)
const searchQuery = ref('')

const dependents = ref([])

function abrirFormularioEndereco() {
  dialog.value = true
}

const loadDependents = async () => {
  isLoading.value = true
  try {
    const response = await dependentStore.responsibleByStudentFilter(authStore.state.user.responsible_data.id)
    dependents.value = response.data
  } catch (error) {
    console.error('Erro ao carregar dependentes:', error)
  } finally {
    isLoading.value = false
  }
}

const filteredDependents = computed(() => {
  if (!searchQuery.value) return dependents.value
  
  const query = searchQuery.value.toLowerCase()
  return dependents.value.filter(dependent => 
    dependent.name.toLowerCase().includes(query) ||
    dependent.email.toLowerCase().includes(query) ||
    dependent.passenger_data?.student_data?.grade?.toLowerCase().includes(query) ||
    dependent.telephone?.includes(query)
  )
})

onMounted(() => {
  loadDependents()
})
</script>

<template>
  <section class="dependent-management">
    <div class="management-toolbar">
      <div class="search-section">
        <v-text-field
          v-model="searchQuery"
          density="comfortable"
          variant="outlined"
          placeholder="Buscar dependentes..."
          prepend-inner-icon="mdi-magnify"
          clearable
          hide-details
          class="search-field"
        />
      </div>
    </div>

    <!-- Content Section -->
    <div class="management-content">
      <div v-if="isLoading" class="loading-section">
        <v-progress-circular
          indeterminate
          color="primary"
          size="64"
        />
        <p>Carregando dependentes...</p>
      </div>

      <div v-else-if="dependents.length === 0" class="empty-state">
        <div class="empty-illustration">
          <v-icon icon="mdi-account-group" size="80" color="grey-lighten-2"></v-icon>
        </div>
        <h2>Nenhum dependente cadastrado</h2>
        <p>Comece adicionando seu primeiro dependente para acompanhar suas atividades.</p>
        <v-btn 
          color="primary" 
          size="large"
          @click="abrirFormularioEndereco"
          class="empty-action-btn"
        >
          <v-icon icon="mdi-plus" class="mr-2"></v-icon>
          Adicionar Primeiro Dependente
        </v-btn>
      </div>

      <div v-else-if="filteredDependents.length === 0 && searchQuery" class="no-results">
        <v-icon icon="mdi-magnify-remove" size="64" color="grey-lighten-2"></v-icon>
        <h3>Nenhum dependente encontrado</h3>
        <p>Tente ajustar os termos da sua busca.</p>
        <v-btn 
          variant="text" 
          @click="searchQuery = ''"
          class="clear-search-btn"
        >
          Limpar busca
        </v-btn>
      </div>

      <div v-else class="dependents-section">
        <div class="results-info">
          <span class="results-count">
            Mostrando {{ filteredDependents.length }} de {{ dependents.length }} dependentes
          </span>
        </div>
        <HaveDependantsComp :dependents="filteredDependents" />
      </div>
    </div>

    <!-- Modal -->
    <ModalAddDependent v-model="dialog" @dependent-added="loadDependents" />
  </section>
</template>

<style scoped>
.dependent-management {
  width: 100%;
  margin: 0 auto;
  padding: 2rem 0;
}

.management-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 2rem;
  gap: 2rem;
}

.header-content {
  flex: 1;
}

.page-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: #1f2937;
  margin: 0 0 0.5rem 0;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.page-subtitle {
  font-size: 1.1rem;
  color: #6b7280;
  margin: 0;
}

.add-btn {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  font-weight: 600;
  padding: 0.75rem 1.5rem;
}

.management-toolbar {
  display: flex;
  gap: 2rem;
  margin-bottom: 2rem;
  align-items: flex-start;
}

.search-section {
  flex: 1;
}

.search-field {
  background: white;
}

.stats-section {
  display: flex;
  gap: 1rem;
}

.stat-card {
  background: white;
  padding: 1rem 1.5rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  border: 1px solid #e5e7eb;
  text-align: center;
  min-width: 100px;
}

.stat-value {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 0.25rem;
}

.stat-label {
  font-size: 0.875rem;
  color: #6b7280;
  text-transform: uppercase;
  font-weight: 600;
}

.management-content {
  min-height: 400px;
}

.loading-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem;
  gap: 1rem;
}

.loading-section p {
  color: #6b7280;
  margin: 0;
}

.empty-state {
  text-align: center;
  padding: 4rem 2rem;
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
}

.empty-illustration {
  margin-bottom: 1.5rem;
}

.empty-state h2 {
  font-size: 1.5rem;
  color: #1f2937;
  margin: 0 0 1rem 0;
}

.empty-state p {
  color: #6b7280;
  margin: 0 0 2rem 0;
  max-width: 400px;
  margin-left: auto;
  margin-right: auto;
}

.empty-action-btn {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.no-results {
  text-align: center;
  padding: 4rem 2rem;
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
}

.no-results h3 {
  font-size: 1.25rem;
  color: #1f2937;
  margin: 1rem 0 0.5rem 0;
}

.no-results p {
  color: #6b7280;
  margin: 0 0 1.5rem 0;
}

.clear-search-btn {
  color: #667eea;
}

.results-info {
  margin-bottom: 1rem;
}

.results-count {
  font-size: 0.875rem;
  color: #6b7280;
  font-weight: 500;
}

/* Responsividade */
@media (max-width: 768px) {
  .dependent-management {
    padding: 1rem;
  }
  
  .management-header {
    flex-direction: column;
    text-align: center;
    gap: 1rem;
  }
  
  .page-title {
    font-size: 2rem;
  }
  
  .management-toolbar {
    flex-direction: column;
    gap: 1rem;
  }
  
  .stats-section {
    justify-content: center;
  }
  
  .stat-card {
    min-width: 80px;
    padding: 0.75rem 1rem;
  }
}

@media (max-width: 480px) {
  .page-title {
    font-size: 1.75rem;
  }
  
  .stat-card {
    min-width: 70px;
    padding: 0.5rem 0.75rem;
  }
  
  .stat-value {
    font-size: 1.25rem;
  }
}
</style>