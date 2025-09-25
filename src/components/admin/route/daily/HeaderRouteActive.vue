<script setup>
import { ref } from 'vue'

const isMenuOpen = ref(false)

const toggleMenu = () => {
    isMenuOpen.value = !isMenuOpen.value
}

const closeMenu = () => {
    isMenuOpen.value = false
}
</script>

<template>
    <div class="mobile-container">
        <header class="header">
            <div class="logo-container">
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

            <nav class="sidebar-nav">
                <ul>
                    <li><a href="#" @click="closeMenu">Início</a></li>
                    <li><a href="#" @click="closeMenu">Produtos</a></li>
                    <li><a href="#" @click="closeMenu">Serviços</a></li>
                    <li><a href="#" @click="closeMenu">Sobre</a></li>
                    <li><a href="#" @click="closeMenu">Contato</a></li>
                </ul>
            </nav>
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
    border-bottom: 1px solid #e0e0e0;
    height: 60px;
}

.sidebar-header h3 {
    margin: 0;
    color: #333;
    font-size: 18px;
    font-weight: 600;
}

.sidebar-nav {
    padding: 20px 0;
}

.sidebar-nav ul {
    list-style: none;
    margin: 0;
    padding: 0;
}

.sidebar-nav li {
    margin: 0;
}

.sidebar-nav a {
    display: block;
    padding: 12px 20px;
    color: #333;
    text-decoration: none;
    font-size: 16px;
    transition: background-color 0.2s;
}

.sidebar-nav a:hover {
    background-color: #f5f5f5;
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

}
</style>