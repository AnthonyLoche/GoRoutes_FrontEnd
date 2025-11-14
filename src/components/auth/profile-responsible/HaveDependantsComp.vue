<script setup>
import { ref } from 'vue'
import AccountCircle from "vue-material-design-icons/AccountCircle.vue"
import MapMarker from "vue-material-design-icons/MapMarker.vue"
import School from "vue-material-design-icons/School.vue"
import Phone from "vue-material-design-icons/Phone.vue"

const props = defineProps({
  dependents: {
    type: Array,
    required: true
  }
})

const expandedCard = ref(null)

const toggleExpand = (id) => {
  expandedCard.value = expandedCard.value === id ? null : id
}

// Função para truncar texto longo
const truncateText = (text, maxLength = 25) => {
  if (!text) return 'Não informado'
  if (text.length <= maxLength) return text
  return text.substring(0, maxLength) + '...'
}

// Função para obter iniciais do nome
const getInitials = (name) => {
  if (!name) return 'ND'
  return name.split(' ').map(w => w.charAt(0)).join('').substring(0, 2).toUpperCase()
}
</script>

<template>
  <section class="dependents-container">
    <div class="dependents-grid">
      <div 
        v-for="dependent in props.dependents" 
        :key="dependent.id" 
        class="dependent-card"
        :class="{ 
          selected: expandedCard === dependent.id,
          expanded: expandedCard === dependent.id 
        }"
        @click="toggleExpand(dependent.id)"
      >
        <!-- Avatar com iniciais -->
        <div class="dependent-avatar">
          <span class="avatar-initials">
            {{ getInitials(dependent.name) }}
          </span>
        </div>

        <div class="dependent-info">
          <div class="dependent-header">
            <h3 class="dependent-name" :title="dependent.name">
              <span class="name-text">{{ truncateText(dependent.name, 20) }}</span>
            </h3>
            <p class="dependent-email" :title="dependent.email">
              <span class="email-text">{{ truncateText(dependent.email, 25) }}</span>
            </p>
          </div>
        </div>

        <div class="selection-checkbox">
          <div class="checkbox" :class="{ checked: expandedCard === dependent.id }">
            <span v-if="expandedCard === dependent.id" class="checkmark">✓</span>
          </div>
        </div>

        <div v-if="expandedCard === dependent.id" class="selection-overlay"></div>
        <div class="card-expanded-content" v-if="expandedCard === dependent.id">
          <div class="expanded-info-grid">
            <div class="info-item">
              <Phone class="icon" />
              <div class="info-text">
                <span class="label">Telefone</span>
                <span class="value" :title="dependent.telephone">
                  {{ truncateText(dependent.telephone, 15) || 'Não informado' }}
                </span>
              </div>
            </div>
            
            <div class="info-item">
              <School class="icon" />
              <div class="info-text">
                <span class="label">Série Completa</span>
                <span class="value" :title="dependent.passenger_data?.student_data?.grade">
                  {{ dependent.passenger_data?.student_data?.grade || 'Não informada' }}
                </span>
              </div>
            </div>
            
            <div class="info-item">
              <MapMarker class="icon" />
              <div class="info-text">
                <span class="label">Matrícula</span>
                <span class="value" :title="dependent.passenger_data?.student_data?.registration">
                  {{ dependent.passenger_data?.student_data?.registration || 'Não informada' }}
                </span>
              </div>
            </div>
          </div>

          <div class="card-actions">
            <RouterLink 
              :to="`/blank/responsible/track-dependents?dependent=${dependent.id}`"
              class="action-btn primary"
            >
              <MapMarker class="icon" />
              Rastrear
            </RouterLink>
            <RouterLink 
              :to="`/blank/responsible/dependent/${dependent.id}`"
              class="action-btn secondary"
            >
              <AccountCircle class="icon" />
              Ver Perfil
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.dependents-container {
  --primary: #022840;
  --primary-dark: #011a2b;
  --secondary: #0d4f6b;
  --accent: #1a73e8;
  --white: #ffffff;
  --text: #334155;
  --text-light: #64748b;
  --shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  --radius: 12px;
  --success: #10b981;
  --warning: #f59e0b;
  --danger: #ef4444;
}

.dependents-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 1.5rem;
  padding: 1rem 0;
}

.dependent-card {
  background: white;
  border-radius: var(--radius);
  padding: 1.5rem;
  box-shadow: var(--shadow);
  cursor: pointer;
  transition: all 0.4s ease;
  border: 2px solid transparent;
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.dependent-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, var(--primary), var(--accent));
  transform: scaleX(0);
  transition: transform 0.3s ease;
  border-radius: var(--radius) var(--radius) 0 0;
}

.dependent-card.selected {
  border-color: var(--accent);
  background: linear-gradient(135deg, rgba(26, 115, 232, 0.03), rgba(2, 40, 64, 0.03));
}

.dependent-card.selected::before {
  transform: scaleX(1);
}

.dependent-card:hover {
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  transform: translateY(-2px);
}

.dependent-card.expanded {
  box-shadow: 0 12px 35px rgba(0, 0, 0, 0.2);
}

.selection-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(26, 115, 232, 0.05), rgba(2, 40, 64, 0.05));
  pointer-events: none;
  border-radius: var(--radius);
}

/* Avatar estilo SecondForm */
.dependent-avatar {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  overflow: hidden;
  position: relative;
  border: 3px solid transparent;
  background: linear-gradient(white, white) padding-box,
              linear-gradient(45deg, var(--primary), var(--accent)) border-box;
  flex-shrink: 0;
}

.avatar-initials {
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, var(--primary), var(--accent));
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
  font-size: 1.2rem;
}

.dependent-info {
  flex: 1;
  min-width: 0;
}

.dependent-header {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.dependent-name {
  color: var(--primary);
  font-size: 1.1rem;
  font-weight: 600;
  margin: 0;
  display: flex;
  align-items: center;
  width: 100%;
}

.name-text {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  flex: 1;
  min-width: 0;
}

.dependent-email {
  color: var(--text-light);
  font-size: 0.9rem;
  margin: 0;
  display: flex;
  align-items: center;
  width: 100%;
}

.email-text {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  flex: 1;
  min-width: 0;
}

.dependent-details {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.detail-row {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
}

.detail-icon {
  width: 20px;
  text-align: center;
  flex-shrink: 0;
}

.detail-text {
  color: var(--text);
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  min-width: 0;
}

/* Checkbox estilo SecondForm */
.selection-checkbox {
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
}

.checkbox {
  width: 24px;
  height: 24px;
  border: 2px solid #e2e8f0;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  background: white;
}

.checkbox.checked {
  background: linear-gradient(135deg, var(--primary), var(--accent));
  border-color: var(--accent);
  color: white;
}

.checkmark {
  font-size: 0.9rem;
  font-weight: bold;
}

/* Conteúdo expandido */
.card-expanded-content {
  padding-top: 1rem;
  border-top: 1px solid #e5e7eb;
  animation: slideDown 0.3s ease;
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.expanded-info-grid {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.info-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  background: #f8fafc;
  border-radius: 8px;
}

.info-text {
  display: flex;
  flex-direction: column;
  flex: 1;
  min-width: 0;
}

.label {
  font-size: 0.75rem;
  color: #6b7280;
  text-transform: uppercase;
  font-weight: 600;
  margin-bottom: 0.25rem;
}

.value {
  font-size: 0.9rem;
  color: #374151;
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
}

.icon {
  color: #667eea;
  flex-shrink: 0;
}

.icon.small {
  width: 16px;
  height: 16px;
}

.card-actions {
  display: flex;
  gap: 0.75rem;
}

.action-btn {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 500;
  font-size: 0.875rem;
  transition: all 0.2s ease;
  border: none;
  cursor: pointer;
  white-space: nowrap;
}

.action-btn.primary {
  background: #3b82f6;
  color: white;
}

.action-btn.primary:hover {
  background: #2563eb;
  transform: translateY(-1px);
}

.action-btn.secondary {
  background: #f3f4f6;
  color: #374151;
  border: 1px solid #d1d5db;
}

.action-btn.secondary:hover {
  background: #e5e7eb;
  transform: translateY(-1px);
}

/* Tooltip para texto truncado */
.dependent-name:hover .name-text,
.dependent-email:hover .email-text,
.detail-text:hover,
.value:hover {
  cursor: help;
}

/* Responsividade */
@media (max-width: 768px) {
  .dependents-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  
  .dependent-card {
    padding: 1rem;
  }
  
  .dependent-avatar {
    width: 50px;
    height: 50px;
  }
  
  .dependent-name {
    font-size: 1rem;
  }
  
  .card-actions {
    flex-direction: column;
  }
  
  .name-text {
    max-width: 150px;
  }
  
  .email-text {
    max-width: 180px;
  }
}

@media (max-width: 480px) {
  .dependents-grid {
    grid-template-columns: 1fr;
  }
  
  .dependent-header {
    text-align: center;
  }
  
  .name-text,
  .email-text {
    max-width: 200px;
  }
  
  .selection-checkbox {
    top: 1rem;
    right: 1rem;
  }
}

/* Para telas muito pequenas */
@media (max-width: 360px) {
  .name-text {
    max-width: 120px;
  }
  
  .email-text {
    max-width: 150px;
  }
  
  .value {
    font-size: 0.8rem;
  }
  
  .action-btn {
    font-size: 0.8rem;
    padding: 0.6rem 0.8rem;
  }
}
</style>