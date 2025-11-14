<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import { useAuthStore } from "@/stores";
import Account from "vue-material-design-icons/Account.vue";
import Logout from "vue-material-design-icons/Logout.vue"

const authStore = useAuthStore();
const menuOpen = ref(false);

const toggleMenu = () => {
  menuOpen.value = !menuOpen.value;
};

const closeMenu = (e) => {
  if (!e.target.closest(".profile-container")) {
    menuOpen.value = false;
  }
};

onMounted(() => document.addEventListener("click", closeMenu));
onBeforeUnmount(() => document.removeEventListener("click", closeMenu));
</script>

<template>
  <nav class="navbar">
    <div class="navbar-container">
      <div class="nav-links" v-if="!authStore.state.token">
        <router-link to="/blank/login" class="nav-link">Login</router-link>
        <router-link to="/blank/register" class="btn-register">
          Cadastre-se
        </router-link>
      </div>

      <div class="profile-container" v-else>
        <div class="profile-menu" @click="toggleMenu">
          <img
            :src="authStore.state.user.picture_file"
            class="profile-img"
            alt="profile"
          />
          <div class="profile-name">
            {{ authStore.state.user.name.split(" ")[0] }}
          </div>
          <svg class="chevron" width="16" height="16" viewBox="0 0 24 24">
            <path fill="currentColor" d="M7 10l5 5 5-5z" />
          </svg>
        </div>

        <transition name="fade">
          <div v-if="menuOpen" class="dropdown">
            <router-link to="/blank/profile/driver" class="dropdown-item" v-if="authStore.state.type === 'driver'">
                <Account />
               Meu Perfil
            </router-link>
            <router-link to="/blank/profile/responsible" class="dropdown-item" v-if="authStore.state.type === 'responsible'">
               <Account />
                Meu Perfil
            </router-link>
            <router-link to="/blank/profile/passenger" class="dropdown-item" v-if="authStore.state.type === 'passenger'">
              <Account />
                Meu Perfil
            </router-link>
             <router-link to="/blank/profile/minor" class="dropdown-item" v-if="authStore.state.type === 'minor'">
              <Account />
                Meu Perfil
            </router-link>
            <button @click="authStore.logout" class="dropdown-item logout">
                <Logout />
               Sair
            </button>
          </div>
        </transition>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.navbar {
  padding: 12px 24px;
  display: flex;
  justify-content: center;
  position: sticky;
  top: 0;
  z-index: 100;
}

span{
    display: flex;
    align-items: center;
    justify-content: center;
}

.navbar-container {
  width: 100%;
  max-width: 1200px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo {
  display: flex;
  align-items: center;
  gap: 8px;
}

.title {
  font-size: 22px;
  font-weight: 600;
  color: #333;
}

/* Links */
.nav-links {
  display: flex;
  align-items: center;
  gap: 16px;
}

.nav-link {
  color: #444;
  text-decoration: none;
  font-weight: 500;
}

.nav-link:hover {
  color: #1976d2;
}

.btn-register {
  background: #1976d2;
  color: #fff;
  padding: 8px 14px;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 600;
}

.btn-register:hover {
  background: #125ea5;
}

.profile-container {
  position: relative;
}

.profile-menu {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  padding: 6px 10px;
  border-radius: 10px;
  transition: background 0.2s;
}

.profile-menu:hover {
  background: #f3f3f3;
}

.profile-img {
  width: 34px;
  height: 34px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #1976d2;
}

.profile-name {
  font-weight: 500;
  color: #333;
}

.chevron {
  transition: transform 0.2s;
}
.profile-menu:hover .chevron {
  transform: rotate(180deg);
}

.dropdown {
  position: absolute;
  top: 50px;
  right: 0;
  background: #fff;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  min-width: 180px;
  overflow: hidden;
  animation: fadeIn 0.2s ease-in-out;
}

.dropdown-item {
  padding: 12px;
  text-align: left;
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  font-size: 15px;
  color: #444;
  text-decoration: none;
  transition: background 0.2s;
  gap: .5rem;
}

.dropdown-item:hover {
  background: #f3f3f3;
}

.logout {
  color: #d32f2f;
  font-weight: 600;
}

/* Animations */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
