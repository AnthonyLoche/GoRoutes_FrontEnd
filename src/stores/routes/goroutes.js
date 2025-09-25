import { defineStore } from 'pinia'
import { GoRoutesService } from '@/services'
import { reactive, ref } from 'vue'
import { useAuthStore } from '../auth/auth'

export const useGoRoutesStore = defineStore('goroutes', () => {
  const state = reactive({
    routes: [],
    selectedRoute: null,
    selectedRouteToInit: null,
    activeRoutes: [],
    transiDrivers: [],
    selectedDriverToTrack: null,
    myActiveRoute: null,
    myDriverRoutes: [],
    loading: false,
    error: null,
  })

  const state_create = reactive({
    daily_route: {
      original: ref(true),
      passenger_list: [],
      date: '2024-02-02',
      route: null,
    },
  })

  const authStore = useAuthStore()
  const driverId = authStore.state.user.driver_data?.id

  const getRoutes = async () => {
    state.loading = true
    try {
      const response = await GoRoutesService.getRoutes()
      state.routes = response
    } catch (error) {
      state.error = error
    } finally {
      state.loading = false
    }
  }

  const getActiveRoutes = async () => {
    state.loading = true
    try {
      const response = await GoRoutesService.getActiveRoutes()
      state.activeRoutes = response

      let allRoutes = []

      for (const route of state.activeRoutes) {
        allRoutes.push({
          route_id: route.id,
          driver_name: route.driver.user.name,
          driver_id: route.driver.id,
          email: route.driver.user.email,
          icon_driver: route.driver.user.picture?.file,
          my_location: route.driver.user.my_location,
          vehicle: route.vehicle.id,
          route_name: route.name,
        })
      }

      state.transiDrivers = allRoutes
    } catch (error) {
      state.error = error
    } finally {
      state.loading = false
    }
  }

  const getRouteById = async (id) => {
    state.loading = true
    try {
      const response = await GoRoutesService.getRouteById(id)
      state.selectedRoute = response
    } catch (error) {
      state.error = error
    } finally {
      state.loading = false
    }
  }

  const getRouteByIdToInit = async (id) => {
    state.loading = true
    try {
      const response = await GoRoutesService.getRouteByIdToInit(id)
      state.selectedRouteToInit = response
    } catch (error) {
      state.error = error
    } finally {
      state.loading = false
    }
  }

  const getRouteByDriverId = async () => {
    state.loading = true
    try {
      const response = await GoRoutesService.getRouteByDriverId(3)
      state.myActiveRoute = response
    } catch (error) {
      state.error = error
    } finally {
      state.loading = false
    }
  }

  const filterMyDriverRoutes = async () => {
    state.loading = true
    try {
      const response = await GoRoutesService.filterMyDriverRoutes(driverId)
      state.myDriverRoutes = response
    } catch (error) {
      state.error = error
    } finally {
      state.loading = false
    }
  }

  const setDailyRouteOriginal = (value) => {
    state_create.daily_route.original = value
    console.log(state_create.daily_route)
  }

  const takeMyDailyRoute = async () => {
    try{
        const response = await GoRoutesService.takeMyDailyRoute(authStore.state.user?.driver_data?.id)
        state.myActiveRoute = response.data?.active_route
        return response
    }catch(error){
        console.log(error)
    }
  }

  const markPresenceOrAbsence = async (data) => {
    try{
        const response = GoRoutesService.markPresenceOrAbsence(data);
        return response
    }catch(error){
        console.error(error)
    }
  }

  const refreshDailyRouteById = async (id) =>{
    try{
        const response = await GoRoutesService.refreshDailyRouteById(id);
        state.myActiveRoute = response.data
        return response
    }catch(error){
        console.log(error)
    }
  }

  return {
    state,
    state_create,
    getRoutes,
    getActiveRoutes,
    getRouteById,
    getRouteByDriverId,
    filterMyDriverRoutes,
    getRouteByIdToInit,
    setDailyRouteOriginal,
    takeMyDailyRoute,
    markPresenceOrAbsence,
    refreshDailyRouteById
  }
})
