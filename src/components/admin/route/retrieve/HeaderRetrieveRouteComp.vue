<!-- eslint-disable no-unused-vars -->
<script setup>
import { useRouter } from 'vue-router'
import ArrowLeft from 'vue-material-design-icons/ArrowLeft.vue'
import MapMarkerPath from 'vue-material-design-icons/MapMarkerPath.vue'
import FileDownload from 'vue-material-design-icons/FileDownload.vue'
import Pencil from 'vue-material-design-icons/Pencil.vue'
import Delete from 'vue-material-design-icons/Delete.vue'

const router = useRouter()

const props = defineProps({
  routeData: {
    type: Object,
    required: true
  },
  title: {
    type: String,
    default: 'Informações completas da rota'
  }
})

const emit = defineEmits(['edit', 'export', 'delete', 'back'])

const goBack = () => {
  emit('back')
}

const editRoute = () => {
  emit('edit')
}

const deleteRoute = () => {
  emit('delete')
}

const exportRoute = () => {
  emit('export')
}
</script>

<template>
  <div class="details-header">
    <div class="header-left">
   
      <div class="header-title-section">
        <MapMarkerPath :size="42" />
        <div>
          <h1>{{ routeData.name }}</h1>
          <p>{{ title }}</p>
        </div>
      </div>
    </div>
    <div class="header-actions">
      <button class="action-btn edit-btn" @click="editRoute">
        <Pencil :size="20" />
        <span>Editar</span>
      </button>
      <button class="action-btn export-btn" @click="exportRoute">
        <FileDownload :size="20" />
        <span>Exportar</span>
      </button>
      <button class="action-btn delete-btn" @click="deleteRoute">
        <Delete :size="20" />
        <span>Excluir</span>
      </button>
    </div>
  </div>
</template>

<style scoped>
.details-header {
  background: white;
  border-radius: 16px;
  padding: 2rem;
  margin-bottom: 1.5rem;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  overflow: hidden;
  --primary: #022840;
  --gradient-primary: linear-gradient(135deg, #022840, #1a73e8);
}

.details-header::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 5px;
  background: var(--gradient-primary);
}

.header-left {
  display: flex;
  align-items: center;
  gap: 2rem;
}

.back-button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: linear-gradient(135deg, rgba(2, 40, 64, 0.1), rgba(26, 115, 232, 0.1));
  border: none;
  border-radius: 25px;
  padding: 0.75rem 1.5rem;
  color: var(--primary);
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
}

.back-button:hover {
  transform: translateX(-5px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
  background: var(--gradient-primary);
  color: white;
}

.header-title-section {
  display: flex;
  align-items: center;
  gap: 1rem;
  color: var(--primary);
}

.header-title-section h1 {
  font-size: 2rem;
  font-weight: 700;
  margin: 0;
  margin-bottom: 0.2rem;
}

.header-title-section p {
  font-size: 0.95rem;
  color: #64748b;
  margin: 0;
}

.header-actions {
  display: flex;
  gap: 1rem;
}

.action-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  border: none;
  border-radius: 25px;
  padding: 0.75rem 1.5rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.edit-btn {
  background: linear-gradient(135deg, #FF9800, #F57C00);
  color: white;
}

.export-btn {
  background: var(--gradient-primary);
  color: white;
}

.delete-btn {
  background: linear-gradient(135deg, #F44336, #C62828);
  color: white;
}

.action-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
}

/* Responsividade */
@media (max-width: 768px) {
  .details-header {
    flex-direction: column;
    gap: 1.5rem;
  }

  .header-left {
    flex-direction: column;
    width: 100%;
  }

  .header-title-section {
    flex-direction: column;
    text-align: center;
  }

  .header-title-section h1 {
    font-size: 1.5rem;
  }

  .header-actions {
    flex-wrap: wrap;
    justify-content: center;
    width: 100%;
  }

  .action-btn {
    flex: 1;
    min-width: 120px;
  }
}
</style>