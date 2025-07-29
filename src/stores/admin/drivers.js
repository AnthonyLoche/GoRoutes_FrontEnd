import { DriversService } from "@/services";
import { defineStore } from "pinia";
import { reactive } from "vue";

export const useDriversStore = defineStore("drivers", () => {
    const state = reactive({
        drivers: [],
        loading: false,
        error: null,
    })

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

    return {
        state,
        getDrivers,
        createDriver,
        deleteDriver,
    }

});