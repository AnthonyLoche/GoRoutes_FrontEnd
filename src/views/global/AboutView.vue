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
          <h2>Sobre Nós</h2>
          <p class="tagline">Conheça a história e a visão por trás do GoRoutes - desenvolvido por estudantes, para revolucionar o transporte escolar</p>
        </div>
        <div class="hero-image">
          <div class="stats-preview">
            <div class="stat-item">
              <div class="stat-number">2024</div>
              <div class="stat-label">Ano de Fundação</div>
            </div>
            <div class="stat-item">
              <div class="stat-number">5</div>
              <div class="stat-label">Desenvolvedores</div>
            </div>
            <div class="stat-item">
              <div class="stat-number">IFC</div>
              <div class="stat-label">Campus Araquari</div>
            </div>
          </div>
        </div>
      </div>
    </header>

    <!-- Nossa História Section -->
    <section class="our-story">
      <div class="section-header">
        <h2>Nossa História</h2>
        <p>Como tudo começou no IFC Campus Araquari</p>
      </div>
      <div class="story-content">
        <div class="story-text">
          <div class="story-card">
            <div class="story-icon">🎓</div>
            <h3>O Início</h3>
            <p>O GoRoutes nasceu como um projeto acadêmico no Instituto Federal Catarinense (IFC) Campus Araquari, desenvolvido por cinco estudantes apaixonados por tecnologia e inovação. Identificamos a necessidade de otimizar o transporte escolar em nossa região e decidimos criar uma solução completa.</p>
          </div>
          <div class="story-card">
            <div class="story-icon">💡</div>
            <h3>A Ideia</h3>
            <p>Observamos as dificuldades enfrentadas por empresas de transporte escolar, pais preocupados com a segurança de seus filhos e a falta de comunicação eficiente entre todos os envolvidos. Assim surgiu a ideia de criar uma plataforma integrada que conectasse todos os usuários.</p>
          </div>
          <div class="story-card">
            <div class="story-icon">🚀</div>
            <h3>O Desenvolvimento</h3>
            <p>Com dedicação e muito estudo, desenvolvemos uma solução robusta utilizando tecnologias modernas. Nossa plataforma integra otimização de rotas, rastreamento GPS, notificações em tempo real e uma interface intuitiva para todos os tipos de usuários.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Missão, Visão e Valores -->
    <section class="mission-vision">
      <div class="mission-vision-grid">
        <div class="mvv-card mission">
          <div class="mvv-icon">🎯</div>
          <h3>Missão</h3>
          <p>Transformar o transporte escolar através da tecnologia, proporcionando segurança, eficiência e tranquilidade para estudantes, famílias e empresas de transporte.</p>
        </div>
        <div class="mvv-card vision">
          <div class="mvv-icon">🔭</div>
          <h3>Visão</h3>
          <p>Ser a principal plataforma de gestão de transporte escolar do Brasil, reconhecida pela inovação, qualidade e impacto positivo na educação.</p>
        </div>
        <div class="mvv-card values">
          <div class="mvv-icon">💎</div>
          <h3>Valores</h3>
          <ul>
            <li>Segurança em primeiro lugar</li>
            <li>Inovação constante</li>
            <li>Transparência total</li>
            <li>Compromisso com a educação</li>
            <li>Excelência no atendimento</li>
          </ul>
        </div>
      </div>
    </section>

    <section class="impact-goals">
      <div class="impact-goals-container">
        <div class="impact-side">
          <h3>Nosso Impacto</h3>
          <div class="impact-stats">
            <div class="impact-stat">
              <div class="impact-number">100%</div>
              <div class="impact-label">Otimização de Rotas</div>
            </div>
            <div class="impact-stat">
              <div class="impact-number">24/7</div>
              <div class="impact-label">Monitoramento</div>
            </div>
            <div class="impact-stat">
              <div class="impact-number">∞</div>
              <div class="impact-label">Possibilidades</div>
            </div>
          </div>
          <p>Desenvolvemos uma solução que não apenas resolve problemas atuais, mas antecipa necessidades futuras do transporte escolar.</p>
        </div>
        <div class="goals-side">
          <h3>Nossos Objetivos</h3>
          <div class="goals-list">
            <div class="goal-item">
              <div class="goal-icon">🎯</div>
              <div class="goal-content">
                <h4>Expansão Nacional</h4>
                <p>Levar o GoRoutes para todo o Brasil, conectando milhares de estudantes e famílias</p>
              </div>
            </div>
            <div class="goal-item">
              <div class="goal-icon">🌱</div>
              <div class="goal-content">
                <h4>Sustentabilidade</h4>
                <p>Reduzir emissões através da otimização inteligente de rotas e combustível</p>
              </div>
            </div>
            <div class="goal-item">
              <div class="goal-icon">🔮</div>
              <div class="goal-content">
                <h4>Inovação Contínua</h4>
                <p>Integrar IA, IoT e tecnologias emergentes para sempre estar à frente</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="cta-section">
      <h2>Faça Parte da Nossa História</h2>
      <p>Junte-se a nós nesta jornada para revolucionar o transporte escolar no Brasil</p>
      <div class="cta-buttons">
        <button class="cta-button primary" @click="$router.push('/blank/register')">Criar Conta Gratuita</button>
        <!-- <button class="cta-button secondary" @click="$router.push('/blank/contact')">Entre em Contato</button> -->
      </div>
    </section>
    <FooterMain />
  </div>
</template>

<script setup>
import FooterMain from '@/components/global/Footer/FooterMain.vue'
import { useAuthStore } from '@/stores'
import NavBarHome from '@/components/global/NavBarHome.vue'

const authStore = useAuthStore()
</script>

<style scoped>
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

/* Navbar styles (mesmo da home) */
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
  padding: 4rem 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

@keyframes gradientShift {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

.heroContainer {
  max-width: 1200px;
  display: flex;
  align-items: center;
  gap: 3rem;
  width: 100%;
}

.hero-content {
  flex: 1;
  text-align: left;
}

.hero-content h2 {
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 1rem;
}

.tagline {
  font-size: 1.2rem;
  opacity: 0.9;
  max-width: 500px;
}

.hero-image {
  flex: 1;
  display: flex;
  justify-content: center;
}

.stats-preview {
  background: white;
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 20px 60px rgba(0,0,0,0.1);
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  max-width: 300px;
}

.stat-item {
  text-align: center;
  padding: 1rem;
  border-radius: 12px;
  background: linear-gradient(135deg, var(--bg-light), white);
  transition: transform 0.3s ease;
}

.stat-item:hover {
  transform: translateY(-3px);
}

.stat-number {
  font-size: 2rem;
  font-weight: 700;
  color: var(--primary);
  margin-bottom: 0.5rem;
}

.stat-label {
  color: var(--text-light);
  font-size: 0.9rem;
}

/* Nossa História */
.our-story {
  padding: 5rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.section-header {
  text-align: center;
  margin-bottom: 3rem;
}

.section-header h2 {
  font-size: 2.5rem;
  color: var(--secondary);
  margin-bottom: 1rem;
}

.section-header p {
  color: var(--text-light);
  font-size: 1.1rem;
}

.story-content {
  margin-top: 3rem;
}

.story-text {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
}

.story-card {
  background: white;
  border-radius: 20px;
  padding: 2.5rem;
  box-shadow: 0 10px 40px rgba(0,0,0,0.08);
  transition: all 0.4s ease;
  border: 1px solid rgba(26, 115, 232, 0.1);
  position: relative;
  overflow: hidden;
}

.story-card::before {
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

.story-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 25px 80px rgba(26, 115, 232, 0.15);
}

.story-card:hover::before {
  transform: scaleX(1);
}

.story-icon {
  font-size: 3rem;
  margin-bottom: 1.5rem;
  display: inline-block;
}

.story-card h3 {
  font-size: 1.5rem;
  color: var(--primary);
  margin-bottom: 1rem;
}

.story-card p {
  color: var(--text-light);
  line-height: 1.7;
}

/* Missão, Visão e Valores */
.mission-vision {
  background: var(--bg-light);
  padding: 5rem 2rem;
}

.mission-vision-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.mvv-card {
  background: white;
  border-radius: 20px;
  padding: 2.5rem;
  box-shadow: 0 10px 40px rgba(0,0,0,0.08);
  transition: all 0.4s ease;
  text-align: center;
}

.mvv-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 25px 80px rgba(26, 115, 232, 0.15);
}

.mvv-icon {
  font-size: 3.5rem;
  margin-bottom: 1.5rem;
  display: inline-block;
}

.mvv-card h3 {
  font-size: 1.8rem;
  color: var(--primary);
  margin-bottom: 1.5rem;
}

.mvv-card p {
  color: var(--text-light);
  line-height: 1.7;
  font-size: 1.1rem;
}

.mvv-card ul {
  list-style: none;
  padding: 0;
  text-align: left;
}

.mvv-card li {
  color: var(--text);
  margin-bottom: 0.8rem;
  padding-left: 1.5rem;
  position: relative;
  font-size: 1.1rem;
}

.mvv-card li::before {
  content: "✓";
  position: absolute;
  left: 0;
  color: var(--accent);
  font-weight: bold;
  font-size: 1.2rem;
}

/* Equipe Detalhada */
.team-detailed {
  padding: 5rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.team-detailed-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 3rem;
}

.team-detailed-member {
  background: white;
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 0 15px 50px rgba(0,0,0,0.08);
  transition: all 0.4s ease;
  position: relative;
}

.team-detailed-member:hover {
  transform: translateY(-10px);
  box-shadow: 0 25px 80px rgba(26, 115, 232, 0.15);
}

.member-photo {
  position: relative;
  height: 250px;
  overflow: hidden;
  background: linear-gradient(135deg, var(--primary), var(--accent));
}

.member-photo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease;
}

.team-detailed-member:hover .member-photo img {
  transform: scale(1.1);
}

.member-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(2, 40, 64, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.team-detailed-member:hover .member-overlay {
  opacity: 1;
}

.github-btn {
  background: white;
  color: var(--primary);
  padding: 1rem;
  border-radius: 50%;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
}

.github-btn:hover {
  transform: scale(1.1);
  background: var(--accent);
  color: white;
}

.member-info {
  padding: 2rem;
}

.member-info h4 {
  font-size: 1.4rem;
  color: var(--primary);
  margin-bottom: 0.5rem;
}

.member-role {
  color: var(--accent);
  font-weight: 600;
  margin-bottom: 1rem;
  font-size: 1.1rem;
}

.member-description {
  color: var(--text-light);
  line-height: 1.6;
  margin-bottom: 1.5rem;
}

.member-skills {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.skill-tag {
  background: linear-gradient(135deg, var(--primary), var(--accent));
  color: white;
  padding: 0.4rem 1rem;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 500;
}

/* Tecnologias */
.technologies {
  background: var(--bg-light);
  padding: 5rem 2rem;
}

.tech-categories {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 3rem;
}

.tech-category h4 {
  font-size: 1.5rem;
  color: var(--secondary);
  margin-bottom: 2rem;
  text-align: center;
}

.tech-grid {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.tech-item {
  background: white;
  border-radius: 16px;
  padding: 1.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  box-shadow: 0 8px 30px rgba(0,0,0,0.06);
  transition: all 0.3s ease;
}

.tech-item:hover {
  transform: translateX(10px);
  box-shadow: 0 12px 40px rgba(26, 115, 232, 0.1);
}

.tech-icon {
  font-size: 2.5rem;
  width: 60px;
  display: flex;
  justify-content: center;
}

.tech-info h5 {
  color: var(--primary);
  margin-bottom: 0.5rem;
  font-size: 1.1rem;
}

.tech-info p {
  color: var(--text-light);
  font-size: 0.9rem;
}

/* Impacto e Objetivos */
.impact-goals {
  padding: 5rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.impact-goals-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: start;
}

.impact-side h3,
.goals-side h3 {
  font-size: 2rem;
  color: var(--secondary);
  margin-bottom: 2rem;
}

.impact-stats {
  display: flex;
  justify-content: space-between;
  margin-bottom: 2rem;
  background: white;
  padding: 2rem;
  border-radius: 20px;
  box-shadow: 0 10px 40px rgba(0,0,0,0.08);
}

.impact-stat {
  text-align: center;
  flex: 1;
}

.impact-number {
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--primary);
  margin-bottom: 0.5rem;
}

.impact-label {
  color: var(--text-light);
  font-size: 0.9rem;
}

.impact-side p {
  color: var(--text-light);
  line-height: 1.7;
  font-size: 1.1rem;
}

.goals-list {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.goal-item {
  display: flex;
  align-items: flex-start;
  gap: 1.5rem;
  background: white;
  padding: 2rem;
  border-radius: 20px;
  box-shadow: 0 10px 40px rgba(0,0,0,0.08);
  transition: all 0.3s ease;
}

.goal-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 20px 60px rgba(26, 115, 232, 0.1);
}

.goal-icon {
  font-size: 2.5rem;
  min-width: 60px;
  display: flex;
  justify-content: center;
}

.goal-content h4 {
  color: var(--primary);
  margin-bottom: 0.8rem;
  font-size: 1.3rem;
}

.goal-content p {
  color: var(--text-light);
  line-height: 1.6;
}

/* CTA Section */
.cta-section {
  background: linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%);
  background-size: 400% 400%;
  animation: gradientShift 8s ease infinite;
  color: white;
  text-align: center;
  padding: 5rem 2rem;
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
  font-size: 2.5rem;
  margin-bottom: 1rem;
  position: relative;
  z-index: 1;
}

.cta-section p {
  max-width: 600px;
  margin: 0 auto 3rem;
  opacity: 0.9;
  font-size: 1.2rem;
  position: relative;
  z-index: 1;
}

.cta-buttons {
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  flex-wrap: wrap;
  position: relative;
  z-index: 1;
}

.cta-button {
  padding: 1rem 2rem;
  border: none;
  border-radius: 50px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.4s ease;
  position: relative;
  overflow: hidden;
  min-width: 200px;
}

.cta-button.primary {
  background: linear-gradient(45deg, white, #f1f5f9);
  color: var(--primary);
  box-shadow: 0 8px 25px rgba(0,0,0,0.2);
}

.cta-button.secondary {
  background: transparent;
  color: white;
  border: 2px solid white;
  box-shadow: 0 8px 25px rgba(255,255,255,0.2);
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

.cta-button.primary:hover {
  background: linear-gradient(45deg, var(--secondary), var(--accent));
  color: white;
  transform: translateY(-3px);
  box-shadow: 0 12px 35px rgba(26, 115, 232, 0.4);
}

.cta-button.secondary:hover {
  background: white;
  color: var(--primary);
  transform: translateY(-3px);
  box-shadow: 0 12px 35px rgba(255,255,255,0.3);
}

/* Responsive */
@media (max-width: 1024px) {
  .heroContainer {
    flex-direction: column;
    text-align: center;
    gap: 2rem;
  }
  
  .hero-content h2 {
    font-size: 2.5rem;
  }
  
  .impact-goals-container {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
  
  .team-detailed-grid {
    grid-template-columns: 1fr;
  }
  
  .impact-stats {
    flex-direction: column;
    gap: 1.5rem;
  }
}

@media (max-width: 768px) {
  .navbar-container {
    padding: 1rem;
  }
  
  .hero {
    padding: 3rem 1rem;
  }
  
  .hero-content h2 {
    font-size: 2rem;
  }
  
  .section-header h2 {
    font-size: 2rem;
  }
  
  .our-story,
  .team-detailed,
  .technologies,
  .impact-goals {
    padding: 3rem 1rem;
  }
  
  .mission-vision {
    padding: 3rem 1rem;
  }
  
  .cta-section {
    padding: 3rem 1rem;
  }
  
  .cta-section h2 {
    font-size: 2rem;
  }
  
  .story-text {
    grid-template-columns: 1fr;
  }
  
  .mission-vision-grid {
    grid-template-columns: 1fr;
  }
  
  .tech-categories {
    grid-template-columns: 1fr;
  }
  
  .team-detailed-grid {
    grid-template-columns: 1fr;
  }
  
  .cta-buttons {
    flex-direction: column;
    align-items: center;
  }
  
  .cta-button {
    width: 100%;
    max-width: 300px;
  }
}

@media (max-width: 480px) {
  .hero-content h2 {
    font-size: 1.8rem;
  }
  
  .stats-preview {
    max-width: 250px;
  }
  
  .story-card,
  .mvv-card,
  .tech-item,
  .goal-item {
    padding: 1.5rem;
  }
  
  .member-info {
    padding: 1.5rem;
  }
  
  .section-header h2 {
    font-size: 1.8rem;
  }
}
</style>