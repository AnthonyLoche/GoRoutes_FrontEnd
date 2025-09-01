<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const isMenuOpen = ref(false)
const router = useRouter()

const toggleMenu = () => {
    isMenuOpen.value = !isMenuOpen.value
}

const closeMenu = () => {
    isMenuOpen.value = false
}

// Dados dos cards/apps
const menuItems = [
    { name: 'Perfil', icon: 'mdi-account', color: '#607D8B' },
    { name: 'Rota em que estou', icon: 'mdi-map-marker', color: '#FF5722' },
    { name: 'Início', icon: 'mdi-home', color: '#4CAF50' },
    { name: 'Informar Volta', icon: 'mdi-bus', color: '#3F51B5' }
]

const goToHome = () => {
    router.push('/')
}
</script>

<template>
    <div class="mobile-container">
        <header class="header">
            <div class="logo-container" @click="goToHome">
                <img src="../../../assets/images/LogoRemoved.png" alt="Logo" class="logo">
                <h3>GoRoutes</h3>
            </div>
            
            <v-btn @click="toggleMenu" icon variant="text" class="menu-btn">
                <v-icon>mdi-menu</v-icon>
            </v-btn>
        </header>

        <div v-if="isMenuOpen" class="overlay" @click="closeMenu"></div>

        <aside class="sidebar" :class="{ 'sidebar-open': isMenuOpen }">
            <div class="sidebar-header">
                <h3>Menu</h3>
                <v-btn @click="closeMenu" icon variant="text" size="small">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </div>

            <div class="apps-container">
                <div class="apps-grid">
                    <div 
                        v-for="item in menuItems" 
                        :key="item.name"
                        class="app-card"
                        @click="closeMenu"
                    >
                        <div class="app-icon" :style="{ backgroundColor: item.color }">
                            <v-icon size="24" color="white">{{ item.icon }}</v-icon>
                        </div>
                        <span class="app-name">{{ item.name }}</span>
                    </div>
                </div>
            </div>
        </aside>
    </div>
</template>

<style scoped>
.mobile-container {
    position: relative;
}

.header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 60px;
    background: white;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 16px;
    z-index: 1000;
}

.logo-container {
    display: flex;
    align-items: center;
    cursor: pointer;
}

.logo {
    height: 70px;
    width: auto;
    object-fit: contain;
}

.menu-btn {
    color: #333;
}

.overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 1001;
    opacity: 0;
    animation: fadeIn 0.3s ease-in-out forwards;
}

@keyframes fadeIn {
    to {
        opacity: 1;
    }
}

.sidebar {
    position: fixed;
    top: 0;
    right: 0;
    width: 300px;
    height: 100vh;
    background: white;
    box-shadow: -2px 0 8px rgba(0, 0, 0, 0.15);
    z-index: 1002;
    transform: translateX(100%);
    transition: transform 0.3s ease-in-out;
    overflow-y: auto;
}

.sidebar-open {
    transform: translateX(0);
}

.sidebar-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px 20px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    height: 60px;
    backdrop-filter: blur(10px);
}

.sidebar-header h3 {
    margin: 0;
    color: #333;
    font-size: 18px;
    font-weight: 600;
}

.sidebar-header .v-btn {
    color: #333 !important;
}

.apps-container {
    padding: 30px 20px;
}

.apps-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
    max-width: 100%;
}

.app-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px 15px;
    background: rgba(255, 255, 255, 0.95);
    border-radius: 16px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    cursor: pointer;
    transition: all 0.3s ease;
    backdrop-filter: blur(10px);
    border: 1px solid rgba(0, 0, 0, 0.1);
}

.app-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
    background: rgba(255, 255, 255, 1);
}

.app-card:active {
    transform: translateY(0);
    transition: transform 0.1s ease;
}

.app-icon {
    width: 50px;
    height: 50px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 10px;
    box-shadow: 0 3px 8px rgba(0, 0, 0, 0.2);
    transition: transform 0.2s ease;
}

.app-card:hover .app-icon {
    transform: scale(1.05);
}

.app-name {
    font-size: 13px;
    font-weight: 500;
    color: #333;
    text-align: center;
    line-height: 1.2;
}

.main-content {
    margin-top: 60px;
    padding: 20px;
}

@media (max-width: 768px) {
    .sidebar {
        width: 280px;
    }
}

@media (max-width: 480px) {
    .sidebar {
        width: 100vw;
    }

    .header {
        padding: 0 12px;
    }
    
    .apps-grid {
        grid-template-columns: repeat(3, 1fr);
        gap: 15px;
    }
    
    .app-card {
        padding: 15px 10px;
    }
    
    .app-icon {
        width: 45px;
        height: 45px;
    }
    
    .app-name {
        font-size: 12px;
    }
}

@media (max-width: 360px) {
    .apps-grid {
        grid-template-columns: repeat(2, 1fr);
    }
}
</style>