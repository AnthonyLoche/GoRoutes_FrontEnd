import { createRouter, createWebHistory } from 'vue-router'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import BlankLayout from '@/layouts/BlankLayout.vue'
import { Views } from '@/views'
// import { useAuthStore } from '@/stores'

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
      { path: 'admin/dashboard-details', component: Views.DashboardDetailView },
      { path: 'admin/drivers', component: Views.DriverAdminView },
      { path: 'admin/vehicles', component: Views.VehiclesAdminView },
      { path: 'admin/vehicles/:id', component: Views.VehicleAdminRetrieveView },
      { path: 'admin/drivers/:id', component: Views.DriverAdminRetrieveView },
      { path: 'admin/drivers/:id/track', component: Views.DriverAdminTrackByIdView },
      { path: 'admin/drivers/track-driver', component: Views.DriverAdminTrackView },
      { path: 'admin/passengers', component: Views.PassengersAdminView },
      { path: 'admin/passengers/:id', component: Views.PassengerAdminRetrieveView },
      { path: 'admin/responsibles', component: Views.ResponsiblesAdminView },
      { path: 'admin/responsible/:id', component: Views.DataResponsibleAdminView },
      { path: 'admin/routes/create', component: Views.CreateRoutesView },
      { path: 'admin/drivers/init-daily-route/:id', component: Views.DriverInitDailyRouteView },
      { path: 'admin/routes/list', component: Views.RoutesListView },
      {path: 'admin/routes/consult', component: Views.RoutesConsultView},
      {path: 'admin/route/:id', component: Views.RouteRetrieveView}

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
      { path: 'driver/completed-routes', component: Views.DriverAdminCompletedRoutesView },
      { path: 'profile/minor', component: Views.ProfileMinorView },
      { path: 'minor/my-daily-route', component: Views.MinorMyDailyRouteView },
      { path: 'minor/report-back', component: Views.MinorReportBackView },
      { path: 'minor/my-routes', component: Views.MinorMyRoutesView },
      { path: 'test', component: Views.TestView },
      { path: 'websocket', component: Views.WebSocketView },
      { path: 'admin/drivers/my-daily-route', component: Views.DriverRouteIsActive },
      { path: 'responsible/dependents', component: Views.MyDependentsView },
      { path: 'responsible/dependent/:id', component: Views.DetailDependentView, props: true },
      { path: 'responsible/track-dependents', component: Views.TrackMyDependentsView },
      { path: 'driver/my-routes', component: Views.DriverMyRoutesView },
      { path: 'about', component: Views.AboutView },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

// router.beforeEach(async (to, from, next) => {
//   const authStore = useAuthStore()
//   console.log('Router guard - Current state:', authStore.state)

//   // Se estiver indo para login e já estiver logado, redireciona para a página apropriada
//   if (to.path === '/blank/login' && authStore.state.isLogged) {
//     const routes = {
//       driver: '/blank/profile/driver',
//       responsible: '/blank/profile/responsible',
//       student: '/blank/profile/student',
//       passenger: '/blank/profile/passenger',
//     }

//     if (routes[authStore.state.type]) {
//       next(routes[authStore.state.type])
//       return
//     }
//   }

//   // Se a rota requer autenticação
//   if (to.matched.some((record) => record.meta.requiresAuth)) {
//     if (!authStore.state.isLogged) {
//       console.log('Usuário não logado, redirecionando para login')
//       next('/blank/login')
//       return
//     }

//     // Se o usuário está logado mas não tem tipo definido, tenta atualizar os dados
//     if (authStore.state.isLogged && !authStore.state.type && authStore.state.user?.id) {
//       try {
//         console.log('Atualizando dados do usuário...')
//         await authStore.refreshDataUser(authStore.state.user.id)
//       } catch (error) {
//         console.error('Erro ao atualizar dados do usuário:', error)
//       }
//     }

//     next()
//   } else {
//     next()
//   }
// })

export default router
