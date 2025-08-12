import { createRouter, createWebHistory } from 'vue-router';
import DefaultLayout from '@/layouts/DefaultLayout.vue';
import BlankLayout from '@/layouts/BlankLayout.vue';
import { Views } from '@/views';
import { useAuthStore } from '@/stores';

const routes = [
  {
    path: '/',
    component: Views.HomeView,
  },
  {
    path: '/default',
    component: DefaultLayout,
    meta: { requiresAuth: true },
    children: [
      { path: '', component: Views.HomeView },
      { path: 'home', component: Views.HomeView },
      { path: 'admin/dashboard', component: Views.DashboardView },
      { path: 'admin/drivers', component: Views.DriverAdminView },
      { path: 'admin/vehicles', component: Views.VehiclesAdminView },
      { path: 'admin/vehicles/:id', component: Views.VehicleAdminRetrieveView },
      { path: 'admin/drivers/:id', component: Views.DriverAdminRetrieveView },
      { path: 'admin/drivers/:id/track', component: Views.DriverAdminTrackByIdView },
      { path: 'admin/drivers/track-driver', component: Views.DriverAdminTrackView },
      { path: 'admin/passengers', component: Views.PassengersAdminView },
      { path: 'admin/passengers/:id', component: Views.PassengerAdminRetrieveView },
      { path: 'admin/responsibles', component: Views.ResponsiblesAdminView },
    ],
  },
  {
    path: '/blank',
    component: BlankLayout,
    children: [
      { path: '', component: Views.LoginView },
      { path: 'login', component: Views.LoginView },
      { path: 'register', component: Views.RegisterView },
      { path: 'profile/responsible', component: Views.ProfileResponsibleView },
      { path: 'profile/driver', component: Views.ProfileDriverView },
      { path: 'test', component: Views.TestView },
      { path: 'websocket', component: Views.WebSocketView },
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
