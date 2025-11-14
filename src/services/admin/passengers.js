import api from "@/plugins/axios";
import { showSuccessToast, showErrorToast } from '@/utils/toast'

class PassengersService {
    async getPassengers() {
        try {
            const response = await api.get(`/authentication/users/?is_passenger=true`);
            return response;
        } catch (error) {
            console.error(error);
            return error;
        }
    }

    async getPassenger(id) {
        try {
            const response = await api.get(`/authentication/users/${id}/`);
            return response;
        } catch (error) {
            console.error(error);
            return error;
        }
    }

    async createPassenger(data) {
        try {
            const response = await api.post(`/authentication/passengers/`, data);
            showSuccessToast('Passageiro criado com sucesso!');
            return response;
        } catch (error) {
            console.error(error);
            showErrorToast('Erro ao criar passageiro');
            return error;
        }
    }

    async deletePassenger(id) {
        try {
            const response = await api.delete(`/authentication/passengers/${id}/`);
            showSuccessToast('Passageiro deletado com sucesso!');
            return response;
        } catch (error) {
            console.error(error);
            showErrorToast('Erro ao deletar passageiro');
            return error;
        }
    }
}

export default new PassengersService();