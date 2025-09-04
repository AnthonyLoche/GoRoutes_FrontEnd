<template>
  <div class="container">
    <!-- Navbar -->
    <nav class="navbar">
      <div class="navbar-container">
        <div class="logo">
          <img src="../../assets/images/LogoRemoved.png" width="80px" alt="">
          <h1 style="font-family: Homenaje;">GoRoutes</h1>
        </div>
        <div class="nav-links" v-if="!authStore.state.token">
          <router-link to="/blank/login" class="nav-link">Login</router-link>
          <router-link to="/blank/register" class="btn-register">Cadastre-se</router-link>
        </div>
        <div class="nav-links" v-else>
          <NavBarHome />
        </div>
       
      </div>
    </nav>

    <!-- Hero Section -->
    <header class="hero">
      <div class="heroContainer">
        <div class="hero-content">
          <h2>Bem-vindo ao GoRoutes</h2>
          <p class="tagline">A melhor solução para gerenciar rotas de transporte escolar com eficiência e segurança</p>
            <button class="cta-button" @click="$router.push('/blank/register')">Cadastre-se Agora</button>
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

    <!-- Features Section -->
    <section class="features" id="features">
      <div class="section-header">
        <h2>Recursos</h2>
        <p>Ferramentas poderosas para otimizar o transporte escolar</p>
      </div>
      <div class="features-grid">
        <div class="feature-card" v-for="feature in features" :key="feature.id">
          <div class="feature-icon">{{ feature.icon }}</div>
          <h3>{{ feature.title }}</h3>
          <p>{{ feature.description }}</p>
        </div>
      </div>
    </section>

    <!-- How It Works Section -->
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

    <!-- User Types Section -->
    <section class="user-types">
      <div class="section-header">
        <h2>Tipos de Usuário</h2>
        <p>Sistema adaptado para diferentes necessidades</p>
      </div>
      <div class="user-types-grid">
        <div class="user-type-card" v-for="userType in userTypes" :key="userType.type">
          <div class="user-type-icon">{{ userType.icon }}</div>
          <h3>{{ userType.type }}</h3>
          <p>{{ userType.description }}</p>
          <ul>
            <li v-for="feature in userType.features" :key="feature">{{ feature }}</li>
          </ul>
        </div>
      </div>
    </section>
    <!-- Team Section -->
    <section class="team">
      <div class="section-header">
        <h2>Nossa Equipe</h2>
        <p>Desenvolvedores dedicados do IFC Campus Araquari</p>
      </div>
      <div class="team-grid">
        <div class="team-member" v-for="member in teamMembers" :key="member.name">
          <div class="member-avatar">
            <img :src="member.avatar" :alt="member.name" />
          </div>
          <h4>{{ member.name }}</h4>
          <p>{{ member.role }}</p>
          <a :href="member.github" class="github-link" target="_blank">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
          </a>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="cta-section">
      <h2>Pronto para otimizar suas rotas?</h2>
      <p>Junte-se à Sul Turismo e outras empresas que já estão revolucionando o transporte escolar</p>
      <button class="cta-button" @click="$router.push('/blank/register')">Criar conta gratuita</button>
    </section>

    <!-- Footer -->
     <FooterMain />
    </div>
</template>

<script setup>
import { ref } from 'vue'
import FooterMain from '@/components/global/Footer/FooterMain.vue'
import { useAuthStore } from '@/stores'
import NavBarHome from '@/components/global/NavBarHome.vue'

const authStore = useAuthStore()
// Reactive data
const features = ref([
  {
    id: 1,
    icon: '🗺️',
    title: 'Otimização Automática',
    description: 'Sistema inteligente que calcula automaticamente a melhor rota baseada na localização dos alunos'
  },
  {
    id: 2,
    icon: '📍',
    title: 'Rastreamento GPS',
    description: 'Acompanhe a localização dos veículos em tempo real com precisão e segurança'
  },
  {
    id: 3,
    icon: '🔔',
    title: 'Notificações',
    description: 'Sistema automatizado de avisos para responsáveis sobre horários e mudanças de rota'
  },
  {
    id: 4,
    icon: '👥',
    title: 'Multi-usuário',
    description: 'Interface adaptada para motoristas, administradores, alunos e responsáveis'
  },
  {
    id: 5,
    icon: '📊',
    title: 'Relatórios',
    description: 'Histórico completo de rotas, presença dos alunos e eventos registrados'
  },
  {
    id: 6,
    icon: '⚡',
    title: 'Tempo Real',
    description: 'Todas as informações são atualizadas instantaneamente para todos os usuários'
  }
])

const steps = ref([
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
])

const userTypes = ref([
  {
    type: 'Motorista',
    icon: '🚗',
    description: 'Profissionais responsáveis pelo transporte',
    features: [
      'Visualizar rotas otimizadas',
      'Registrar presença dos alunos',
      'Comunicar alterações',
      'Acessar informações dos alunos'
    ]
  },
  {
    type: 'Cliente/Aluno',
    icon: '🎓',
    description: 'Estudantes que utilizam o transporte',
    features: [
      'Ver localização do veículo',
      'Informar horários de retorno',
      'Solicitar mudanças pontuais',
      'Acompanhar previsão de chegada'
    ]
  },
  {
    type: 'Responsável',
    icon: '👨‍👩‍👧‍👦',
    description: 'Familiares de alunos menores de idade',
    features: [
      'Acompanhar transporte em tempo real',
      'Receber notificações automáticas',
      'Autorizar desembarques alternativos',
      'Gerenciar dados do aluno'
    ]
  },
  {
    type: 'Administrador',
    icon: '⚙️',
    description: 'Gestores da empresa de transporte',
    features: [
      'Gerenciar todos os dados',
      'Criar e editar rotas',
      'Visualizar relatórios completos',
      'Configurar permissões'
    ]
  }
])


const teamMembers = ref([
  {
    name: 'Anthony Loche Dos Reis',
    role: 'Desenvolvedor',
    avatar: 'https://avatars.githubusercontent.com/u/126203565?v=4',
    github: 'https://github.com/AnthonyLoche'
  },
  {
    name: 'Yohana Jahn',
    role: 'Desenvolvedora',
    avatar: 'https://avatars.githubusercontent.com/u/131276303?v=4',
    github: 'https://github.com/YohanaJahn'
  },
  {
    name: 'Jonatas Silva Peraza',
    role: 'Desenvolvedor',
    avatar: 'https://avatars.githubusercontent.com/u/73970519?v=4',
    github: 'https://github.com/jonatasperaza'
  },
  {
    name: 'Pedro Henrique Malaquias',
    role: 'Desenvolvedor',
    avatar: 'https://avatars.githubusercontent.com/u/127138118?v=4',
    github: 'https://github.com/PedroHenmalaquias'
  },
  {
    name: 'Manuela Luch',
    role: 'Desenvolvedora',
    avatar: 'https://avatars.githubusercontent.com/u/131368191?v=4',
    github: 'https://github.com/ManuelaLuchSilva'
  }
])


</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');

.container {
  --primary: #022840;
  --primary-dark: #011a2b;
  --secondary: #0d4f6b;
  --accent: #1a73e8;
  --white: #ffffff;
  --bg-light: #f8fafc;
  --text: #334155;
  --text-light: #64748b;
  --shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  --radius: 8px;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

button.profile {
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  background-color: var(--primary);
  padding: .5rem;
  color: white;
  border-radius: 20px;
}

button.profile > img {
  height: 100%;
  border-radius: 50%;
}

body {
  font-family: 'Poppins', sans-serif;
  color: var(--text);
  line-height: 1.6;
}

.container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.navbar-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem 2rem;
}

.logo {
  display: flex;
  align-items: center;
  color: var(--primary);
  font-weight: 700;
  transition: transform 0.3s ease;
}

.logo:hover {
  transform: scale(1.05);
}

.logo-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, var(--primary), var(--accent));
  color: white;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  margin-right: 8px;
  font-size: 16px;
  box-shadow: 0 4px 15px rgba(26, 115, 232, 0.3);
  transition: all 0.3s ease;
}

.logo:hover .logo-icon {
  transform: rotate(360deg);
  box-shadow: 0 6px 20px rgba(26, 115, 232, 0.4);
}

.logo h1 {
  font-size: 1.5rem;
  margin: 0;
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.nav-link {
  color: var(--text);
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s;
}

.nav-link:hover {
  color: var(--primary);
}

.btn-register {
  background: linear-gradient(135deg, var(--primary), var(--accent));
  color: white;
  text-decoration: none;
  padding: 0.6rem 1.5rem;
  border-radius: 25px;
  font-weight: 500;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(26, 115, 232, 0.3);
}

.btn-register::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
  transition: left 0.5s;
}

.btn-register:hover::before {
  left: 100%;
}

.btn-register:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(26, 115, 232, 0.4);
}

/* Hero Section */
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

/* Sections */
.features, .how-it-works, .user-types, .technologies, .team {
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

.features {
  background-color: var(--bg-light);
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
  font-size: 2.5rem;
  margin-bottom: 1rem;
  display: inline-block;
  transition: transform 0.3s ease;
}

.feature-card:hover .feature-icon {
  transform: scale(1.1) rotate(5deg);
}

.feature-card h3 {
  margin-bottom: 1rem;
  color: var(--primary);
}

.feature-card p {
  color: var(--text-light);
}

/* Steps */
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

/* User Types */
.user-types {
  background-color: var(--bg-light);
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
  font-size: 3rem;
  margin-bottom: 1rem;
  display: inline-block;
  transition: all 0.3s ease;
}

.user-type-card:hover .user-type-icon {
  transform: scale(1.2) rotate(-5deg);
  filter: drop-shadow(0 5px 15px rgba(26, 115, 232, 0.3));
}

.user-type-card h3 {
  margin-bottom: 1rem;
  color: var(--primary);
}

.user-type-card p {
  color: var(--text-light);
  margin-bottom: 1.5rem;
}

.user-type-card ul {
  list-style: none;
  padding: 0;
}

.user-type-card li {
  color: var(--text);
  margin-bottom: 0.5rem;
  padding-left: 1rem;
  position: relative;
}

.user-type-card li::before {
  content: "✓";
  position: absolute;
  left: 0;
  color: var(--primary);
  font-weight: bold;
}

/* Technologies */
.tech-stack {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
}

.tech-category h4 {
  color: var(--secondary);
  margin-bottom: 1rem;
  text-align: center;
}

.tech-badges {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  justify-content: center;
}

.tech-badge {
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 25px;
  font-size: 0.9rem;
  font-weight: 500;
  transition: all 0.3s ease;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.tech-badge::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
  transition: left 0.5s;
}

.tech-badge:hover::before {
  left: 100%;
}

.tech-badge:hover {
  transform: scale(1.05);
  filter: brightness(1.1);
  box-shadow: 0 5px 15px rgba(0,0,0,0.2);
}

/* Team */
.team {
  background-color: var(--bg-light);
}

.team-grid {
  display: flex;
  gap: 2rem;
}

.team-member {
  background: white;
  border-radius: 20px;
  padding: 2rem;
  text-align: center;
  box-shadow: 0 10px 40px rgba(0,0,0,0.08);
  transition: all 0.4s ease;
  position: relative;
  overflow: hidden;
}

.team-member::after {
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

.team-member:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 60px rgba(26, 115, 232, 0.15);
}

.team-member:hover::after {
  transform: scaleX(1);
}

.member-avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  overflow: hidden;
  margin: 0 auto 1rem;
  position: relative;
  transition: all 0.3s ease;
  border: 3px solid transparent;
  background: linear-gradient(white, white) padding-box,
              linear-gradient(45deg, var(--primary), var(--accent)) border-box;
}

.team-member:hover .member-avatar {
  transform: scale(1.1);
  box-shadow: 0 8px 25px rgba(26, 115, 232, 0.3);
}

.member-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.team-member h4 {
  margin-bottom: 0.5rem;
  color: var(--primary);
}

.team-member p {
  color: var(--text-light);
  margin-bottom: 1rem;
}

.github-link {
  color: var(--text-light);
  transition: color 0.3s;
}

.github-link:hover {
  color: var(--primary);
}

/* CTA Section */
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

@keyframes float {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(180deg); }
}

.cta-section h2 {
  font-size: 2rem;
  margin-bottom: 1rem;
}

.cta-section p {
  max-width: 600px;
  margin: 0 auto 2rem;
  opacity: 0.9;
}

/* Footer */
.footer {
  background-color: var(--secondary);
  color: #aaa;
  padding: 4rem 2rem 2rem;
}

.footer-content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.footer-column h4 {
  color: white;
  margin-bottom: 1.5rem;
  font-size: 1.1rem;
}

.footer-column ul {
  list-style: none;
}

.footer-column ul li {
  margin-bottom: 0.75rem;
}

.footer-column a {
  color: #aaa;
  text-decoration: none;
  transition: color 0.3s;
}

.footer-column a:hover {
  color: var(--primary);
}

.footer-column .logo {
  margin-bottom: 1rem;
}

.footer-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 2rem auto 0;
  padding-top: 2rem;
  border-top: 1px solid #444;
}

.social-links {
  display: flex;
  gap: 1rem;
}

.social-links a {
  color: #aaa;
  transition: color 0.3s;
}

.social-links a:hover {
  color: var(--primary);
}

/* Responsive */
@media (max-width: 768px) {
  .hero {
    flex-direction: column;
    text-align: center;
    padding: 3rem 1.5rem;
  }

  .steps {
    flex-direction: column;
  }

  .footer-bottom {
    flex-direction: column;
    gap: 1rem;
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

  .navbar-container {
    padding: 1rem;
  }

  .hero-content h2 {
    font-size: 2rem;
  }

  .tagline {
    font-size: 1rem;
  }

  .features-grid,
  .user-types-grid,
  .team-grid {
    flex-direction: column;
  }

  .tech-stack {
    flex-direction: column;
  }

  .section-header h2 {
    font-size: 1.5rem;
  }

  .features, .how-it-works, .user-types, .technologies, .team {
    padding: 3rem 1rem;
  }

  .cta-section {
    padding: 3rem 1rem;
  }

  .cta-section h2 {
    font-size: 1.5rem;
  }
}

</style>
