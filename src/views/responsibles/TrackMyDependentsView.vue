<script setup>
import { ref, onMounted } from 'vue'
import { HeaderMain, AsideCompProfile, LoadingComp, FooterMain } from '@/components'
import { AsideToTrackMyDependents, MapToTrackMyDependents } from '@/components'
import { useDependentStore } from '@/stores'

const dependentStore = useDependentStore()
const isLoading = ref(true)
const hasError = ref(false)
const errorMessage = ref('')

onMounted(async () => {
  try {
    console.log('TrackMyDependentsView montado')
    
    const responsibleId = 1 
    await dependentStore.responsibleByStudentFilter(responsibleId)
    
    isLoading.value = false
  } catch (error) {
    console.error('Erro ao carregar TrackMyDependentsView:', error)
    hasError.value = true
    errorMessage.value = error.message || 'Erro ao carregar dependentes'
    isLoading.value = false
  }
})
</script>

<template>
    <LoadingComp v-if="isLoading" />

    <div v-else-if="hasError" class="error-container">
        <div class="error-content">
            <i class="fas fa-exclamation-triangle"></i>
            <h3>Erro ao carregar a página</h3>
            <p>{{ errorMessage }}</p>
            <button @click="$router.go(0)" class="retry-btn">
                Tentar Novamente
            </button>
        </div>
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
                <div class="track-dependents-container">
                    
                    <div class="content-grid">
                        <aside class="dependents-sidebar">
                            <AsideToTrackMyDependents />
                        </aside>
                        <div class="map-section">
                            <MapToTrackMyDependents />
                        </div>
                    </div>
                </div>
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
    width: 100%;
    height: 100%;
    padding: 0;
    overflow-y: auto;
    margin: 0;
}

.track-dependents-container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
}

.page-header {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    padding: 2rem;
    text-align: center;
}

.page-header h1 {
    margin: 0 0 0.5rem 0;
    font-size: 2rem;
    font-weight: 600;
}

.page-header p {
    margin: 0;
    opacity: 0.9;
    font-size: 1.1rem;
}

.content-grid {
    display: grid;
    grid-template-columns: 350px 1fr;
    height: calc(100vh - 200px);
    flex: 1;
}

.dependents-sidebar {
    background: #f8fafc;
    border-right: 1px solid #e5e7eb;
    height: 100%;
    overflow: hidden;
}

.map-section {
    height: 100%;
    background: #f1f5f9;
}

.error-container {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background: #f8fafc;
}

.error-content {
    text-align: center;
    padding: 3rem;
    background: white;
    border-radius: 12px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    max-width: 400px;
}

.error-content i {
    font-size: 3rem;
    color: #ef4444;
    margin-bottom: 1rem;
}

.error-content h3 {
    margin: 0 0 1rem 0;
    color: #1f2937;
    font-size: 1.5rem;
}

.error-content p {
    margin: 0 0 2rem 0;
    color: #6b7280;
}

.retry-btn {
    background: #3b82f6;
    color: white;
    border: none;
    padding: 0.75rem 1.5rem;
    border-radius: 8px;
    font-size: 1rem;
    cursor: pointer;
    transition: background-color 0.2s;
}

.retry-btn:hover {
    background: #2563eb;
}

/* Responsividade */
@media screen and (max-width: 1024px) {
    .grid {
        display: flex;
        flex-direction: column;
    }
    
    .main-default {
        display: flex;
        flex-direction: column;
        height: auto;
    }
    
    .view {
        height: auto;
        width: 100%;
    }
    
    .content-grid {
        grid-template-columns: 1fr;
        grid-template-rows: 400px 1fr;
        height: auto;
    }
    
    .dependents-sidebar {
        border-right: none;
        border-bottom: 1px solid #e5e7eb;
        height: 400px;
    }
    
    .map-section {
        height: 500px;
    }
    
    .page-header {
        padding: 1.5rem;
    }
    
    .page-header h1 {
        font-size: 1.5rem;
    }
    
    .page-header p {
        font-size: 1rem;
    }
}

@media screen and (max-width: 768px) {
    .content-grid {
        grid-template-rows: 350px 1fr;
    }
    
    .dependents-sidebar {
        height: 350px;
    }
    
    .map-section {
        height: 400px;
    }
}

@media screen and (max-width: 480px) {
    .page-header {
        padding: 1rem;
    }
    
    .page-header h1 {
        font-size: 1.25rem;
    }
    
    .page-header p {
        font-size: 0.9rem;
    }
    
    .content-grid {
        grid-template-rows: 300px 1fr;
    }
    
    .dependents-sidebar {
        height: 300px;
    }
    
    .map-section {
        height: 350px;
    }
}
</style>