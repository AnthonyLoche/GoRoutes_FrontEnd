<template>
  <div>
    <button class="toggle-btn" @click="toggleSidebar">☰</button>

    <div class="sidebar" :class="{ show: isSidebarVisible }">
      <div class="menu-category" v-for="(category, index) in menuItems" :key="category.name">
        <router-link
          v-if="!category.subItems || category.subItems.length === 0"
          :to="category.route"
          class="menu-item"
          :class="{ active: isActiveRoute(category.route) }"
          @click="activateCategory(index)"
        >
          <div class="menu-icon">
            <component :is="category.icon" />
          </div>
          <span>{{ category.name }}</span>
        </router-link>

        <div
          v-else
          class="menu-item"
          :class="{ active: category.active }"
          @click="toggleCategory(index)"
          role="button"
          tabindex="0"
          @keydown.enter.prevent="toggleCategory(index)"
        >
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
              :key="subItem.name"
              :to="subItem.route"
              class="submenu-item"
              :class="{ active: isActiveRoute(subItem.route) || subItem.active }"
              @click="activateSubItem(index, subIndex)"
            >
              <div class="menu-icon" style="width:22px;height:22px;margin-right:8px;">
                <component v-if="subItem.icon" :is="subItem.icon" />
              </div>
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

/* ícones */
import Account from 'vue-material-design-icons/Account.vue';
import Map from 'vue-material-design-icons/Map.vue';
import AccountMultiple from 'vue-material-design-icons/AccountMultiple.vue';
import Home from 'vue-material-design-icons/Home.vue';
import Plus from 'vue-material-design-icons/Plus.vue';
import CreditCard from 'vue-material-design-icons/CreditCard.vue';
import FileDocument from 'vue-material-design-icons/FileDocument.vue';
import HelpCircle from 'vue-material-design-icons/HelpCircle.vue';

const route = useRoute();
const isSidebarVisible = ref(true);

const menuItems = ref([
  {
    name: 'Inicio',
    icon: markRaw(Home),
    route: '/',
    expanded: false,
    active: false,
    subItems: []
  },
  {
    name: 'Meu Perfil',
    icon: markRaw(Account),
    route: '/blank/profile/responsible',
    expanded: false,
    active: false,
    subItems: []
  },
  {
    name: 'Dependentes',
    icon: markRaw(AccountMultiple),
    route: '/blank/responsible/dependents',
    expanded: false,
    active: false,
    subItems: [
      {
        name: 'Meus Dependentes',
        icon: markRaw(AccountMultiple),
        route: '/blank/responsible/dependents',
        active: false,
      },
      {
        name: 'Rastrear Dependentes',
        icon: markRaw(Map),
        route: '/blank/responsible/track-dependents',
        active: false,
      },
      {
        name: 'Adicionar Dependente',
        icon: markRaw(Plus),
        route: '/blank/responsible/dependents/add',
        active: false,
      }
    ]
  },
  {
    name: 'Pagamentos',
    icon: markRaw(CreditCard),
    route: '#',
    expanded: false,
    active: false,
    subItems: [
      {
        name: 'Pagamentos Feitos',
        icon: markRaw(FileDocument),
        route: '/blank/responsible/payments/history',
        active: false,
      },
      {
        name: 'Fatura Aberta',
        icon: markRaw(CreditCard),
        route: '/blank/responsible/payments/invoice',
        active: false,
      },
      {
        name: 'Suporte',
        icon: markRaw(HelpCircle),
        route: '/blank/responsible/payments/support',
        active: false,
      }
    ]
  },
]);

const isMobile = ref(false);
const checkMobile = () => {
  isMobile.value = window.innerWidth <= 768;
};

onMounted(() => {
  checkMobile();
  window.addEventListener('resize', checkMobile);

  initActiveFromRoute();
});

onUnmounted(() => {
  window.removeEventListener('resize', checkMobile);
});

const toggleSidebar = () => {
  isSidebarVisible.value = !isSidebarVisible.value;
};

const toggleCategory = (index) => {
  // Apenas altera o estado expandido da categoria clicada
  menuItems.value[index].expanded = !menuItems.value[index].expanded;
  menuItems.value[index].active = true;
  
  // Mantém o active true para outras categorias que já estavam ativas por rota
  // mas não altera seu estado expanded
  menuItems.value.forEach((category, i) => {
    if (i !== index) {
      // Não altera o expanded de outras categorias
      // Apenas gerencia o estado active
      if (!category.subItems.some(subItem => subItem.active)) {
        category.active = false;
      }
    }
  });
};

const activateCategory = (index) => {
  menuItems.value.forEach((category, i) => {
    category.active = i === index;
    category.expanded = i === index && category.subItems.length > 0;
    if (!category.active && category.subItems) {
      category.subItems.forEach(si => si.active = false);
    }
  });
};

const activateSubItem = (categoryIndex, subItemIndex) => {
  menuItems.value.forEach((category, i) => {
    if (category.subItems && category.subItems.length) {
      category.subItems.forEach((subItem, j) => {
        subItem.active = i === categoryIndex && j === subItemIndex;
      });
    }
    category.active = i === categoryIndex;
    category.expanded = i === categoryIndex;
  });
};

const isActiveRoute = (routePath) => {
  return route.path === routePath;
};

function initActiveFromRoute() {
  const current = route.path;
  menuItems.value.forEach((category) => {
    category.active = false;
    category.expanded = false;
    
    // Verifica se a rota atual corresponde à rota principal da categoria
    if (category.route === current && (!category.subItems || category.subItems.length === 0)) {
      category.active = true;
    }
    
    // Verifica se a rota atual corresponde a algum subitem
    if (category.subItems && category.subItems.length) {
      let hasActiveSubItem = false;
      category.subItems.forEach((subItem) => {
        subItem.active = false;
        if (subItem.route === current) {
          subItem.active = true;
          category.active = true;
          category.expanded = true;
          hasActiveSubItem = true;
        }
      });
      
      // Se não há subitem ativo, mas a categoria tem subitems, mantém collapsed
      if (!hasActiveSubItem) {
        category.expanded = false;
      }
    }
  });
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
    display: none;
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