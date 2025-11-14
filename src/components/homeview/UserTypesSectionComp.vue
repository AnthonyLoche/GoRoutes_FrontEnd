<template>
  <section class="user-types">
    <div class="section-header">
      <h2>Tipos de Usuário</h2>
      <p>Sistema adaptado para diferentes necessidades</p>
    </div>
    <div class="user-types-grid">
      <div class="user-type-card" v-for="userType in userTypes" :key="userType.type">
        <div class="user-type-icon" :style="{ color: userType.color }">
          <component :is="userType.icon" :size="48" />
        </div>
        <h3>{{ userType.type }}</h3>
        <p>{{ userType.description }}</p>
        <ul>
          <li v-for="feature in userType.features" :key="feature">{{ feature }}</li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script setup>
import Car from 'vue-material-design-icons/Car.vue'
import School from 'vue-material-design-icons/School.vue'
import AccountGroup from 'vue-material-design-icons/AccountGroup.vue'
import Cog from 'vue-material-design-icons/Cog.vue'

const userTypes = [
  {
    type: 'Motorista',
    icon: Car,
    description: 'Profissionais responsáveis pelo transporte',
    features: [
      'Visualizar rotas otimizadas',
      'Registrar presença dos alunos',
      'Comunicar alterações',
      'Acessar informações dos alunos'
    ],
    color: '#2196F3'
  },
  {
    type: 'Cliente/Aluno',
    icon: School,
    description: 'Estudantes que utilizam o transporte',
    features: [
      'Ver localização do veículo',
      'Informar horários de retorno',
      'Solicitar mudanças pontuais',
      'Acompanhar previsão de chegada'
    ],
    color: '#4CAF50'
  },
  {
    type: 'Responsável',
    icon: AccountGroup,
    description: 'Familiares de alunos menores de idade',
    features: [
      'Acompanhar transporte em tempo real',
      'Receber notificações automáticas',
      'Autorizar desembarques alternativos',
      'Gerenciar dados do aluno'
    ],
    color: '#FF9800'
  },
  {
    type: 'Administrador',
    icon: Cog,
    description: 'Gestores da empresa de transporte',
    features: [
      'Gerenciar todos os dados',
      'Criar e editar rotas',
      'Visualizar relatórios completos',
      'Configurar permissões'
    ],
    color: '#9C27B0'
  }
]
</script>

<style scoped>
.user-types {
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

.user-types-grid {
  display: flex;
  gap: 2rem;
}

.user-type-card {
  background: white;
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 10px 40px rgba(0,0,0,0.08);
  transition: all 0.4s ease;
  position: relative;
  overflow: hidden;
  border: 2px solid transparent;
  text-align: center;
}

.user-type-card::before {
  content: '';
  position: absolute;
  inset: 0;
  padding: 2px;
  background: linear-gradient(45deg, var(--primary), var(--accent));
  border-radius: inherit;
  mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  mask-composite: exclude;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.user-type-card:hover {
  transform: translateY(-10px) scale(1.02);
  box-shadow: 0 25px 80px rgba(26, 115, 232, 0.15);
}

.user-type-card:hover::before {
  opacity: 1;
}

.user-type-icon {
  margin-bottom: 1rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  padding: 1rem;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.9);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.user-type-card:hover .user-type-icon {
  transform: scale(1.1) rotate(-5deg);
  background: white;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
  filter: drop-shadow(0 5px 15px rgba(26, 115, 232, 0.3));
}

.user-type-card h3 {
  margin-bottom: 1rem;
  color: var(--primary);
  font-size: 1.3rem;
}

.user-type-card p {
  color: var(--text-light);
  margin-bottom: 1.5rem;
  line-height: 1.6;
}

.user-type-card ul {
  list-style: none;
  padding: 0;
  text-align: left;
}

.user-type-card li {
  color: var(--text);
  margin-bottom: 0.5rem;
  padding-left: 1.5rem;
  position: relative;
  line-height: 1.5;
}

.user-type-card li::before {
  content: "✓";
  position: absolute;
  left: 0;
  color: var(--primary);
  font-weight: bold;
  font-size: 1.1rem;
}

/* Responsive */
@media (max-width: 1024px) {
  .user-types-grid {
    flex-wrap: wrap;
  }
  
  .user-type-card {
    flex: 1 1 calc(50% - 1rem);
    min-width: 280px;
  }
}

@media (max-width: 768px) {
  .user-types {
    padding: 3rem 1rem;
  }

  .user-types-grid {
    flex-direction: column;
  }

  .section-header h2 {
    font-size: 1.5rem;
  }

  .user-type-card {
    padding: 1.5rem;
  }

  .user-type-icon {
    padding: 0.75rem;
  }
}
</style>    