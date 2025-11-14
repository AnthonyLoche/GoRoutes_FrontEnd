import { ResponsiblesService } from "@/services";
import { defineStore } from "pinia";
import { reactive } from "vue";

export const useResponsiblesStore = defineStore("responsibles", () => {
    const state = reactive({
        responsibles: [],
        selectedResponsible: null,
        loading: false,
        error: null,
    })

    const getResponsibles = async () => {
        state.loading = true;
        try {
            const response = await ResponsiblesService.getResponsibles();
            state.responsibles = response.data;
        } catch (error) {
            state.error = error;
        } finally {
            state.loading = false;
        }
    }

    const getResponsible = async (id) => {
        state.loading = true;
        try{
            const response  = await ResponsiblesService.getResponsible(id);
            state.selectedResponsible = response.data;
            return response;
        }
        catch (error) {
            state.error = error;
            console.error(error);
        } finally {
            state.loading = false;
        }
    }

    const createResponsible = async (data) => {
        state.loading = true;
        try {
            const response = await ResponsiblesService.createResponsible(data);
            state.responsibles.push(response.data);
            return response;
        } catch (error) {
            state.error = error;
            console.error(error);
        } finally {
            state.loading = false;
        }
    }

    const deleteResponsible = async (id) => {
        state.loading = true;
        try {
            const response = await ResponsiblesService.deleteResponsible(id);
            state.responsibles = state.responsibles.filter(responsible => responsible.id !== id);
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
        getResponsibles,
        getResponsible,
        createResponsible,
        deleteResponsible,
    }

});