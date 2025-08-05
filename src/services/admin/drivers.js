import api from "@/plugins/axios";
import { showSuccessToast, showErrorToast } from '@/utils/toast'

class DriversService {
    async getDrivers() {
        try {
            const response = await api.get(`/authentication/users/?is_driver=true`);
            return response;
        } catch (error) {
            console.error(error);
            return error;
        }
    }

    async getDriver(id) {
        try {
            const response = await api.get(`/authentication/users/${id}/`);
            return response;
        } catch (error) {
            console.error(error);
            return error;
        }
    }

    async createDriver(data) {
        try {
            const response = await api.post(`/authentication/drivers/`, data);
            showSuccessToast('Motorista criado com sucesso!');
            return response;
        } catch (error) {
            console.error(error);
            showErrorToast('Erro ao criar motorista');
            return error;
        }
    }

    async deleteDriver(id) {
        try {
            const response = await api.delete(`/authentication/drivers/${id}/`);
            showSuccessToast('Motorista deletado com sucesso!');
            return response;
        } catch (error) {
            console.error(error);
            showErrorToast('Erro ao deletar motorista');
            return error;
        }
    }
}

export default new DriversService();