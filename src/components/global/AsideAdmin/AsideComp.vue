<template>
  <div class="aside-admin">
    <button class="toggle-btn" @click="toggleSidebar">☰</button>

    <div class="sidebar" :class="{ show: isSidebarVisible }">
      <div class="menu-category" v-for="(category, index) in menuItems" :key="index">
        <router-link
          v-if="category.subItems.length === 0"
          :to="category.route"
          class="menu-item"
          :class="{ active: category.active }"
          @click="activateCategory(index)">
          <div class="menu-icon">
            <component :is="category.icon" />
          </div>
          <span>{{ category.name }}</span>
        </router-link>

        <div
          v-else
          class="menu-item"
          :class="{ active: category.active }"
          @click="toggleCategory(index)">
          <div class="menu-icon">
            <component :is="category.icon" />
          </div>
          <span>{{ category.name }}</span>
          <span class="arrow" :class="{ rotated: category.expanded }">▼</span>
        </div>

        <Transition name="accordion">
          <div class="submenu" v-if="category.expanded && category.subItems.length > 0">
            <router-link
              v-for="(subItem, subIndex) in category.subItems"
              :key="subIndex"
              :to="subItem.route"
              class="submenu-item"
              :class="{ active: subItem.active }"
              @click="activateSubItem(index, subIndex)">
              <component :is="subItem.icon" class="submenu-icon" />
              <span>{{ subItem.name }}</span>
            </router-link>
          </div>
        </Transition>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, markRaw } from 'vue'

import CarIcon from 'vue-material-design-icons/Car.vue'
import MapMarkerPathIcon from 'vue-material-design-icons/MapMarkerPath.vue'
import CogIcon from 'vue-material-design-icons/Cog.vue'
import RouteIcon from 'vue-material-design-icons/MapMarker.vue'
import AccountMultiple from "vue-material-design-icons/AccountMultiple.vue"
import HumanMaleBoy from "vue-material-design-icons/HumanMaleBoy.vue"
import SeatPassenger from "vue-material-design-icons/SeatPassenger.vue"
import CardAccountDetails from "vue-material-design-icons/CardAccountDetails.vue"
import Steering from "vue-material-design-icons/Steering.vue"
import Dashboard from "vue-material-design-icons/ViewDashboard.vue"

const isSidebarVisible = ref(true)

const menuItems = ref([
  {
    name: 'Dashboard',
    icon: markRaw(Dashboard),
    route: '/default/admin/dashboard',
    expanded: false,
    active: false,
    subItems: []
  },
  {
    name: 'Veículos',
    icon: markRaw(CarIcon),
    expanded: false,
    active: false,
    subItems: [
      { name: 'Vans e Micros', active: false, route: '/default/admin/vehicles', icon: markRaw(CarIcon) }
    ]
  },
  {
    name: 'Clientes',
    icon: markRaw(AccountMultiple),
    expanded: false,
    active: false,
    subItems: [
      { name: 'Passageiros', active: false, route: '/default/admin/passengers', icon: markRaw(SeatPassenger) },
      { name: 'Responsáveis', active: false, route: '/default/admin/responsibles', icon: markRaw(HumanMaleBoy) },
    ]
  },
  {
    name: 'Motoristas',
    icon: markRaw(Steering),
    expanded: false,
    active: false,
    subItems: [
      { name: 'Motoristas', active: false, route: '/default/admin/drivers', icon: markRaw(CardAccountDetails) },
      { name: 'Rastrear Motorista', active: false, route: '/default/admin/drivers/track-driver', icon: markRaw(MapMarkerPathIcon) }
    ]
  },
  {
    name: 'Rotas',
    icon: markRaw(MapMarkerPathIcon),
    expanded: false,
    active: false,
    subItems: [
      { name: 'Ver Rotas', active: false, route: '/default/admin/routes/list', icon: markRaw(RouteIcon) },
      { name: 'Criar Rota', active: false, route: '/default/admin/routes/create', icon: markRaw(RouteIcon) },
      { name: 'Consultar Rota', active: false, route: '/default/admin/routes/consult', icon: markRaw(RouteIcon) }
    ]
  },
  {
    name: 'Configurações',
    icon: markRaw(CogIcon),
    route: '/default/admin/settings',
    expanded: false,
    active: false,
    subItems: []
  }
])

const toggleSidebar = () => {
  isSidebarVisible.value = !isSidebarVisible.value
}

const toggleCategory = (index) => {
  menuItems.value[index].expanded = !menuItems.value[index].expanded

  menuItems.value.forEach((category, i) => {
    if (i !== index) {
      category.expanded = false
    }
    category.active = i === index
  })
}

const activateCategory = (index) => {
  menuItems.value.forEach((category, i) => {
    category.active = i === index
    // Fecha todos os submenus ao ativar um item sem subitens
    if (category.subItems.length === 0) {
      category.expanded = false
    }
  })
}

const activateSubItem = (categoryIndex, subItemIndex) => {
  menuItems.value.forEach((category) => {
    category.subItems.forEach((subItem) => {
      subItem.active = false
    })
  })

  menuItems.value[categoryIndex].subItems[subItemIndex].active = true
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

.menu-category {
  margin-bottom: 5px;
}

.menu-item {
  display: flex;
  align-items: center;
  padding: 12px 15px;
  cursor: pointer;
  color: #555;
  text-decoration: none;
  transition: background-color 0.2s;
}

.menu-item:hover {
  background-color: #e8e8ff;
}

.menu-item.active {
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

.submenu {
  overflow: hidden;
}

.submenu-item {
  display: flex;
  align-items: center;
  padding: 10px 15px 10px 55px;
  color: #666;
  text-decoration: none;
  transition: background-color 0.2s;
}

.submenu-item:hover {
  background-color: #e8e8ff;
}

.submenu-item.active {
  background-color: #e0e0ff;
  color: #5050ff;
  font-weight: 500;
  border-right: 2px solid #5050ff;
}

.submenu-icon {
  margin-right: 8px;
  width: 18px;
  height: 18px;
  color: #5050ff;
}

.arrow {
  margin-left: auto;
  transition: transform 0.3s;
}

.arrow.rotated {
  transform: rotate(180deg);
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

  .aside-admin{
    display: none;
  }

  .sidebar.show {
    left: 0;
  }

  .toggle-btn {
    display: block;
  }
}

.accordion-enter-active,
.accordion-leave-active {
  transition: all 0.3s ease;
}

.accordion-enter-from,
.accordion-leave-to {
  max-height: 0;
  opacity: 0;
}

.accordion-enter-to,
.accordion-leave-from {
  max-height: 200px;
  opacity: 1;
}

span{
  display: flex;
  align-items: center;
 justify-content: center;
}
</style>