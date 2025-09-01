<template>
  <div v-if="!isMobile">
    <button class="toggle-btn" @click="toggleSidebar">☰</button>
    <div class="sidebar" :class="{ show: isSidebarVisible }">
      <div class="menu-category" v-for="(category, index) in menuItems" :key="index">
        <router-link
          v-if="!category.subItems.length"
          :to="category.route"
          class="menu-item"
          :class="{ active: isActiveRoute(category.route) }"
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
          <span v-if="category.subItems.length > 0" class="arrow" :class="{ rotated: category.expanded }">▼</span>
        </div>
        <Transition name="accordion">
          <div class="submenu" v-if="category.expanded && category.subItems.length > 0">
            <router-link
              v-for="(subItem, subIndex) in category.subItems"
              :key="subIndex"
              :to="subItem.route"
              class="submenu-item"
              :class="{ active: isActiveRoute(subItem.route) }"
              @click.prevent="activateSubItem(index, subIndex)">
              <span>{{ subItem.name }}</span>
            </router-link>
          </div>
        </Transition>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, markRaw, onMounted, onUnmounted } from 'vue';
import { useRoute } from 'vue-router';
import Account from 'vue-material-design-icons/Account.vue';
import Map from "vue-material-design-icons/Map.vue"
import AccountMultiple from "vue-material-design-icons/AccountMultiple.vue";

const route = useRoute();
const isSidebarVisible = ref(true);
const menuItems = ref([
  {
    name: 'Meu Perfil',
    icon: markRaw(Account),
    route: '/blank/profile/responsible',
    expanded: false,
    active: false,
    subItems: []
  },
  {
    name: 'Meus Dependentes',
    icon: markRaw(AccountMultiple),
    route: '/blank/responsible/dependents',
    expanded: false,
    active: false,
    subItems: []
  },
  {
    name: 'Rastrear Meus Dependentes',
    icon: markRaw(Map),
    route: '/blank/responsible/track-dependents',
    expanded: false,
    active: false,
    subItems: []
  }
]);

const isMobile = ref(false);

const checkMobile = () => {
  isMobile.value = window.innerWidth <= 768;
};

onMounted(() => {
  checkMobile();
  window.addEventListener('resize', checkMobile);
});

onUnmounted(() => {
  window.removeEventListener('resize', checkMobile);
});

const toggleSidebar = () => {
  isSidebarVisible.value = !isSidebarVisible.value;
};

const toggleCategory = (index) => {
  menuItems.value[index].expanded = !menuItems.value[index].expanded;
  menuItems.value.forEach((category, i) => {
    if (i !== index) category.expanded = false;
  });
  menuItems.value.forEach((category, i) => {
    category.active = i === index;
  });
};

const activateCategory = (index) => {
  menuItems.value.forEach((category, i) => {
    category.active = i === index;
  });
};

const activateSubItem = (categoryIndex, subItemIndex) => {
  menuItems.value.forEach(category => {
    category.subItems.forEach(subItem => {
      subItem.active = false;
    });
  });
  menuItems.value[categoryIndex].subItems[subItemIndex].active = true;
};

const isActiveRoute = (routePath) => {
  return route.path === routePath;
};
</script>

<style scoped>
/* O estilo permanece o mesmo do código original */
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

.sidebar-collapsed {
  width: 60px;
}

.sidebar-header {
  padding: 15px;
  text-align: center;
  border-bottom: 1px solid #e0e0fe;
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

.arrow {
  margin-left: auto;
  transition: transform 0.3s;
}

.arrow.rotated {
  transform: rotate(180deg);
}

.main-content {
  flex: 1;
  padding: 20px;
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
</style>
