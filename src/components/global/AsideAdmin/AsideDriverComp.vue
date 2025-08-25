<template>
    <div>
        <button class="toggle-btn" @click="toggleSidebar">☰</button>

        <div class="sidebar" :class="{ show: isSidebarVisible }">
            <div class="menu-item" v-for="(item, index) in menuItems" :key="index" :class="{ active: item.active }">
                <router-link :to="item.route" class="menu-link" @click="activateItem(index)">
                    <div class="menu-icon">
                        <component :is="item.icon" />
                    </div>
                    <span>{{ item.name }}</span>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, markRaw } from 'vue'

import CarIcon from 'vue-material-design-icons/Car.vue'
import CogIcon from 'vue-material-design-icons/Cog.vue'

const isSidebarVisible = ref(true)

const menuItems = ref([
    { name: 'Minha Conta', route: '/blank/profile/driver', icon: markRaw(CarIcon), active: false },
    { name: 'Minha Rota', route: '/default/admin/passengers', icon: markRaw(CogIcon), active: false },
    { name: 'Configurações', route: '/admin/settings', icon: markRaw(CogIcon), active: false }
])

const toggleSidebar = () => {
    isSidebarVisible.value = !isSidebarVisible.value
}

const activateItem = (index) => {
    menuItems.value.forEach((item, i) => {
        item.active = i === index
    })
}
</script>

<style scoped>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.sidebar {
    width: 100%;
    background-color: #f8f8ff;
    box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
    transition: width 0.3s ease;
    overflow-y: auto;
    height: 90vh;
    border-right: 2px solid #E5E7EB;
}

.menu-item {
    margin-bottom: 5px;
}

.menu-link {
    display: flex;
    align-items: center;
    padding: 12px 15px;
    cursor: pointer;
    color: #555;
    text-decoration: none;
    transition: background-color 0.2s;
}

.menu-link:hover {
    background-color: #e8e8ff;
}

.menu-item.active .menu-link {
    background-color: #e0e0ff;
    color: #5050ff;
    font-weight: 500;
    border-right: 2px solid #5050ff;
}

.menu-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 30px;
    height: 30px;
    margin-right: 10px;
    color: #6464fe;
}

.toggle-btn {
    position: fixed;
    top: 15px;
    left: 15px;
    z-index: 999;
    display: none;
    cursor: pointer;
    background-color: #6464fe;
    color: white;
    border: none;
    border-radius: 5px;
    padding: 8px 12px;
}

@media (max-width: 768px) {
    .sidebar {
        position: fixed;
        left: -250px;
        z-index: 100;
        transition: left 0.3s ease;
    }

    .sidebar.show {
        left: 0;
    }

    .toggle-btn {
        display: block;
    }
}
</style>
