<template>
  <header class="hero">
    <div class="heroContainer">
      <div class="hero-content">
        <h2>Bem-vindo ao GoRoutes</h2>
        <p class="tagline">A melhor solução para gerenciar rotas de transporte escolar com eficiência e segurança</p>
        <button class="cta-button" @click="goToRegister">Cadastre-se Agora</button>
      </div>
      <div class="hero-image">
        <div class="route-card-preview">
          <div class="route-item">
            <span class="route-status completed"></span>
            <span class="route-title">Rota Centro - Escola A</span>
            <span class="route-time">07:30</span>
          </div>
          <div class="route-item">
            <span class="route-status active"></span>
            <span class="route-title">Rota Bairro Norte</span>
            <span class="route-time">07:45</span>
          </div>
          <div class="route-item">
            <span class="route-status"></span>
            <span class="route-title">Rota Sul - Retorno</span>
            <span class="route-time">17:30</span>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const goToRegister = () => {
  router.push('/blank/register')
}
</script>

<style scoped>
.hero {
  background: linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%);
  background-size: 400% 400%;
  animation: gradientShift 8s ease infinite;
  color: white;
  padding: 5rem 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
  width: 100%;
  margin: 0 auto;
  position: relative;
  overflow: hidden;
}

.hero::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
  animation: shimmer 3s infinite;
}

@keyframes gradientShift {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

@keyframes shimmer {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}

.hero-content {
  flex: 1;
  width: 100%;
  margin: auto;
}

.heroContainer {
  width: 50%;
  margin: auto;
  display: flex;
}

.hero-content h2 {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
}

.tagline {
  font-size: 1.2rem;
  margin-bottom: 2rem;
  opacity: 0.9;
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

.hero-image {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.route-card-preview {
  background: white;
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: 0 20px 60px rgba(0,0,0,0.1);
  width: 100%;
  max-width: 400px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255,255,255,0.2);
  transform: perspective(1000px) rotateY(-5deg);
  transition: transform 0.3s ease;
}

.route-card-preview:hover {
  transform: perspective(1000px) rotateY(0deg) translateY(-5px);
  box-shadow: 0 25px 80px rgba(0,0,0,0.15);
}

.route-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem 0;
  border-bottom: 1px solid #eee;
}

.route-item:last-child {
  border-bottom: none;
}

.route-status {
  display: inline-block;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: #ddd;
  margin-right: 12px;
}

.route-status.completed {
  background-color: #10b981;
}

.route-status.active {
  background-color: #f59e0b;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

.route-title {
  flex: 1;
  color: var(--text);
  font-size: 0.9rem;
}

.route-time {
  color: var(--text-light);
  font-size: 0.8rem;
  font-weight: 500;
}

/* Responsive */
@media (max-width: 768px) {
  .hero {
    flex-direction: column;
    text-align: center;
    padding: 3rem 1.5rem;
  }

  .hero-content, .hero-image {
    max-width: 100%;
  }

  .heroContainer {
    width: 100%;
    margin: auto;
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }

  .hero-content h2 {
    font-size: 2rem;
  }

  .tagline {
    font-size: 1rem;
  }
}
</style>