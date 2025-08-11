import { PassengersService } from "@/services";
import { defineStore } from "pinia";
import { reactive } from "vue";

export const usePassengersStore = defineStore("passengers", () => {
    const state = reactive({
        passengers: [],
        selectedPassenger: null,
        loading: false,
        error: null,
    })

    const getPassengers = async () => {
        state.loading = true;
        try {
            const response = await PassengersService.getPassengers();
            state.passengers = response.data;
        } catch (error) {
            state.error = error;
        } finally {
            state.loading = false;
        }
    }

    const getPassenger = async (id) => {
        state.loading = true;
        try{
            const response  = await PassengersService.getPassenger(id);
            state.selectedPassenger = response.data;
            return response;
        }
        catch (error) {
            state.error = error;
            console.error(error);
        } finally {
            state.loading = false;
        }
    }

    const createPassenger = async (data) => {
        state.loading = true;
        try {
            const response = await PassengersService.createPassenger(data);
            state.passengers.push(response.data);
            return response;
        } catch (error) {
            state.error = error;
            console.error(error);
        } finally {
            state.loading = false;
        }
    }

    const deletePassenger = async (id) => {
        state.loading = true;
        try {
            const response = await PassengersService.deletePassenger(id);
            state.passengers = state.passengers.filter(passenger => passenger.id !== id);
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
        getPassengers,
        getPassenger,
        createPassenger,
        deletePassenger,
    }

});