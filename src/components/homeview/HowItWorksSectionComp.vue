<template>
  <section class="how-it-works">
    <div class="section-header">
      <h2>Como Funciona</h2>
      <p>Em apenas três passos simples</p>
    </div>
    <div class="steps">
      <div class="step" v-for="step in steps" :key="step.number">
        <div class="step-number">{{ step.number }}</div>
        <h3>{{ step.title }}</h3>
        <p>{{ step.description }}</p>
      </div>
    </div>
  </section>
</template>

<script setup>
const steps = [
  {
    number: 1,
    title: 'Cadastre os dados',
    description: 'Registre alunos, motoristas, veículos e endereços no sistema'
  },
  {
    number: 2,
    title: 'Sistema otimiza',
    description: 'Algoritmo calcula automaticamente as melhores rotas possíveis'
  },
  {
    number: 3,
    title: 'Acompanhe tudo',
    description: 'Monitore rotas, localizações e comunique-se em tempo real'
  }
]
</script>

<style scoped>
.how-it-works {
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

.steps {
  display: flex;
  justify-content: space-between;
  gap: 2rem;
  flex-wrap: wrap;
}

.step {
  flex: 1;
  min-width: 250px;
  text-align: center;
  padding: 2rem;
}

.step-number {
  background: linear-gradient(135deg, var(--primary), var(--accent));
  color: white;
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  margin: 0 auto 1.5rem;
  font-size: 1.5rem;
  font-weight: bold;
  box-shadow: 0 8px 25px rgba(26, 115, 232, 0.3);
  transition: all 0.3s ease;
  position: relative;
}

.step-number::after {
  content: '';
  position: absolute;
  top: -5px;
  left: -5px;
  right: -5px;
  bottom: -5px;
  background: linear-gradient(135deg, var(--accent), var(--primary));
  border-radius: 50%;
  z-index: -1;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.step:hover .step-number::after {
  opacity: 1;
}

.step:hover .step-number {
  transform: scale(1.1);
}

.step h3 {
  margin-bottom: 1rem;
  color: var(--secondary);
}

.step p {
  color: var(--text-light);
}

/* Responsive */
@media (max-width: 768px) {
  .how-it-works {
    padding: 3rem 1rem;
  }

  .steps {
    flex-direction: column;
  }

  .section-header h2 {
    font-size: 1.5rem;
  }
}
</style>