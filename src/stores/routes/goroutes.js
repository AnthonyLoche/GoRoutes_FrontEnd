import { defineStore } from "pinia";
import { GoRoutesService } from "@/services";
import { reactive } from "vue";

export const useGoRoutesStore = defineStore("goroutes", () => {
       const state = reactive({
        routes: [],
        selectedRoute: null,
        activeRoutes: [],
        transiDrivers: [],
        selectedDriverToTrack: null,
        loading: false,
        error: null,
    })

    const getRoutes = async () => {
        state.loading = true;
        try {
            const response = await GoRoutesService.getRoutes();
            state.routes = response;
        } catch (error) {
            state.error = error;
        } finally {
            state.loading = false;
        }
    }

    const getActiveRoutes = async () => {
        state.loading = true;
        try {
            const response = await GoRoutesService.getActiveRoutes();
            state.activeRoutes = response;

            let allRoutes = []
            
            for (const route of state.activeRoutes) {
                allRoutes.push({
                    route_id: route.id,
                    driver_name: route.driver.user.name,
                    driver_id: route.driver.id,
                    email: route.driver.user.email,
                    icon_driver : route.driver.user.picture?.file,
                    my_location: route.driver.user.my_location,
                    vehicle: route.vehicle.id,
                    route_name: route.name,
                });
            }

            state.transiDrivers = allRoutes;

        } catch (error) {
            state.error = error;
        } finally {
            state.loading = false;
        }
    }

    const getRouteById = async (id) => {
        state.loading = true;
        try {
            const response = await GoRoutesService.getRouteById(id);
            state.selectedRoute = response;
        } catch (error) {
            state.error = error;
        } finally {
            state.loading = false;
        }
    }

    return {
        state,
        getRoutes,
        getActiveRoutes,
        getRouteById
    }

})