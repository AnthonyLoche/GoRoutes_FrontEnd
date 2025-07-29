import { createRouter, createWebHistory } from 'vue-router';
import DefaultLayout from '@/layouts/DefaultLayout.vue';
import BlankLayout from '@/layouts/BlankLayout.vue';
import { HomeView, LoginView, DashboardView, RegisterView, ProfileResponsibleView, ProfileDriverView, TestView, DriverAdminView} from '@/views';
import { useAuthStore } from '@/stores';

const routes = [
  {
    path: '/',
    component: HomeView
  },
  {
    path: '/default',
    component: DefaultLayout,
    meta: { requiresAuth: true },
    children: [
      { path: '', component: HomeView },
      { path: 'home', component: HomeView },
      { path: 'admin/dashboard', component: DashboardView },
      { path: 'admin/drivers', component: DriverAdminView },  
    ],
  },
  {
    path: '/blank',
    component: BlankLayout,
    children: [
      { path: '', component: LoginView },
      { path: 'login', component: LoginView },
      { path: 'register', component: RegisterView },
      { path: 'profile/responsible', component: ProfileResponsibleView },
      { path: 'profile/driver', component: ProfileDriverView },
      { path: 'test', component: TestView },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();

  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!authStore.state.isLogged) {
      next('/blank/login');
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
