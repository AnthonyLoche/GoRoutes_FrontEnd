import { VehiclesService } from "@/services";
import { defineStore } from "pinia";
import { reactive } from "vue";

export const useVehiclesStore = defineStore("vehicles", () => {
    const state = reactive({
        vehicles: [],
        selectedVehicle: null,
        loading: false,
        error: null,
    })

    const getVehicles = async () => {
        state.loading = true;
        try {
            const response = await VehiclesService.getVehicles();
            state.vehicles = response.data;
        } catch (error) {
            state.error = error;
        } finally {
            state.loading = false;
        }
    }

    const getVehicle = async (id) => {
        state.loading = true;
        try {
            const response = await VehiclesService.getVehicle(id);
            state.selectedVehicle = response.data
        } catch (error) {
            state.error = error;
        } finally {
            state.loading = false;
        }
    }

    const createVehicle = async (data) => {
        state.loading = true;
        try {
            const response = await VehiclesService.createVehicle(data);
            state.vehicles.push(response.data);
            return response;
        } catch (error) {
            state.error = error;
            console.error(error);
        } finally {
            state.loading = false;
        }
    }

    const deleteVehicle = async (id) => {
        state.loading = true;
        try {
            const response = await VehiclesService.deleteVehicle(id);
            state.vehicles = state.vehicles.filter(vehicle => vehicle.id !== id);
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
        getVehicles,
        createVehicle,
        getVehicle,
        deleteVehicle,
    }
});