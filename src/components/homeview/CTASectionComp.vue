<template>
  <section class="cta-section">
    <h2>Pronto para otimizar suas rotas?</h2>
    <p>Junte-se à Sul Turismo e outras empresas que já estão revolucionando o transporte escolar</p>
    <button class="cta-button" @click="goToRegister">Criar conta gratuita</button>
  </section>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const goToRegister = () => {
  router.push('/blank/register')
}
</script>

<style scoped>
.cta-section {
  background: linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%);
  background-size: 400% 400%;
  animation: gradientShift 8s ease infinite;
  color: white;
  text-align: center;
  padding: 4rem 2rem;
  position: relative;
  overflow: hidden;
}

.cta-section::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%);
  animation: float 6s ease-in-out infinite;
}

@keyframes gradientShift {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

@keyframes float {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(180deg); }
}

.cta-section h2 {
  font-size: 2rem;
  margin-bottom: 1rem;
  position: relative;
  z-index: 1;
}

.cta-section p {
  max-width: 600px;
  margin: 0 auto 2rem;
  opacity: 0.9;
  position: relative;
  z-index: 1;
}

.cta-button {
  background: linear-gradient(45deg, white, #f1f5f9);
  color: var(--primary);
  border: none;
  border-radius: var(--radius);
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.4s ease;
  display: inline-flex;
  align-items: center;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
  position: relative;
  overflow: hidden;
  z-index: 1;
}

.cta-button::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
  transition: left 0.5s;
}

.cta-button:hover::before {
  left: 100%;
}

.cta-button:hover {
  background: linear-gradient(45deg, var(--secondary), var(--accent));
  color: white;
  transform: translateY(-3px);
  box-shadow: 0 8px 25px rgba(26, 115, 232, 0.3);
}

/* Responsive */
@media (max-width: 768px) {
  .cta-section {
    padding: 3rem 1rem;
  }

  .cta-section h2 {
    font-size: 1.5rem;
  }
}
</style>