import { DriversService } from "@/services";
import { defineStore } from "pinia";
import { reactive } from "vue";
import { useAuthStore } from "../auth/auth";

export const useDriversStore = defineStore("drivers", () => {
    const state = reactive({
        drivers: [],
        selectedDriver: null,
        loading: false,
        error: null,
        hasOpenDailyRoute: false
    })
    const authStore = useAuthStore()

    const getDrivers = async () => {
        state.loading = true;
        try {
            const response = await DriversService.getDrivers();
            state.drivers = response.data;
        } catch (error) {
            state.error = error;
        } finally {
            state.loading = false;
        }
    }

    const getDriver = async (id) => {
        state.loading = true;
        try{
            const response  = await DriversService.getDriver(id);
            state.selectedDriver = response.data;
            return response;
        }
        catch (error) {
            state.error = error;
            console.error(error);
        } finally {
            state.loading = false;
        }
    }

    const createDriver = async (data) => {
        state.loading = true;
        try {
            const response = await DriversService.createDriver(data);
            state.drivers.push(response.data);
            return response;
        } catch (error) {
            state.error = error;
            console.error(error);
        } finally {
            state.loading = false;
        }
    }

    const deleteDriver = async (id) => {
        state.loading = true;
        try {
            const response = await DriversService.deleteDriver(id);
            state.drivers = state.drivers.filter(driver => driver.id !== id);
            return response;
        } catch (error) {
            state.error = error;
            console.error(error);
        } finally {
            state.loading = false;
        }
    }

    const verifyOpenDailyRoutes = async () => {
        state.loading = true;
        try{
            const response = await DriversService.verifyOpenDailyRoutes(authStore.state?.user?.driver_data?.id)
            state.hasOpenDailyRoute = response.data?.has_active_route
            return response.data
        }catch(error){
            console.error(error)
        }finally{
            state.loading = false
        }
    }

    return {
        state,
        getDrivers,
        getDriver,
        createDriver,
        deleteDriver,
        verifyOpenDailyRoutes
    }

});