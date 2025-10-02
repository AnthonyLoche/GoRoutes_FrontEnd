
<template>
  <section class="features" id="features">
    <div class="section-header">
      <h2>Recursos</h2>
      <p>Ferramentas poderosas para otimizar o transporte escolar</p>
    </div>
    <div class="features-grid">
      <div class="feature-card" v-for="feature in features" :key="feature.id">
        <div class="feature-icon" :style="{ color: feature.color }">
          <component :is="feature.icon" :size="40" />
        </div>
        <h3>{{ feature.title }}</h3>
        <p>{{ feature.description }}</p>
      </div>
    </div>
  </section>
</template>

<script setup>
import Map from 'vue-material-design-icons/Map.vue'
import MapMarker from 'vue-material-design-icons/MapMarker.vue'
import Bell from 'vue-material-design-icons/Bell.vue'
import AccountGroup from 'vue-material-design-icons/AccountGroup.vue'
import ChartBar from 'vue-material-design-icons/ChartBar.vue'
import LightningBolt from 'vue-material-design-icons/LightningBolt.vue'

const features = [
  {
    id: 1,
    icon: Map,
    title: 'Otimização Automática',
    description: 'Sistema inteligente que calcula automaticamente a melhor rota baseada na localização dos alunos',
    color: '#4CAF50'
  },
  {
    id: 2,
    icon: MapMarker,
    title: 'Rastreamento GPS',
    description: 'Acompanhe a localização dos veículos em tempo real com precisão e segurança',
    color: '#2196F3'
  },
  {
    id: 3,
    icon: Bell,
    title: 'Notificações',
    description: 'Sistema automatizado de avisos para responsáveis sobre horários e mudanças de rota',
    color: '#FF9800'
  },
  {
    id: 4,
    icon: AccountGroup,
    title: 'Multi-usuário',
    description: 'Interface adaptada para motoristas, administradores, alunos e responsáveis',
    color: '#9C27B0'
  },
  {
    id: 5,
    icon: ChartBar,
    title: 'Relatórios',
    description: 'Histórico completo de rotas, presença dos alunos e eventos registrados',
    color: '#607D8B'
  },
  {
    id: 6,
    icon: LightningBolt,
    title: 'Tempo Real',
    description: 'Todas as informações são atualizadas instantaneamente para todos os usuários',
    color: '#FF5722'
  }
]
</script>

<style scoped>
.features {
  padding: 5rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.section-header {
  text-align: center;
  margin-bottom: 3rem;
}

.section-header h2 {
  font-size: 2rem;
  color: var(--secondary);
  margin-bottom: 1rem;
}

.section-header p {
  color: var(--text-light);
  max-width: 600px;
  margin: 0 auto;
}

.features-grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 2rem;
}

.feature-card {
  background: white;
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 10px 40px rgba(0,0,0,0.05);
  transition: all 0.4s ease;
  position: relative;
  overflow: hidden;
  border: 1px solid rgba(2, 40, 64, 0.1);
  text-align: center;
}

.feature-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, var(--primary), var(--accent));
  transform: scaleX(0);
  transition: transform 0.3s ease;
}

.feature-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 60px rgba(26, 115, 232, 0.1);
}

.feature-card:hover::before {
  transform: scaleX(1);
}

.feature-icon {
  margin-bottom: 1rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  padding: 1rem;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.9);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.feature-card:hover .feature-icon {
  transform: scale(1.1) rotate(5deg);
  background: white;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
}

.feature-card h3 {
  margin-bottom: 1rem;
  color: var(--primary);
  font-size: 1.2rem;
}

.feature-card p {
  color: var(--text-light);
  line-height: 1.6;
}

/* Responsive */
@media (max-width: 1024px) {
  .features-grid {
    grid-template-columns: 1fr 1fr;
  }
}

@media (max-width: 768px) {
  .features {
    padding: 3rem 1rem;
  }

  .features-grid {
    grid-template-columns: 1fr;
  }

  .section-header h2 {
    font-size: 1.5rem;
  }

  .feature-card {
    padding: 1.5rem;
  }
}
</style>