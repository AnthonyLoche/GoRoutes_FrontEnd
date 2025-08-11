import api from "@/plugins/axios";
import { showSuccessToast, showErrorToast } from '@/utils/toast'

class ResponsiblesService {
    async getResponsibles() {
        try {
            const response = await api.get(`/authentication/users/?is_responsible=true`);
            return response;
        } catch (error) {
            console.error(error);
            return error;
        }
    }

    async getResponsible(id) {
        try {
            const response = await api.get(`/authentication/users/${id}/`);
            return response;
        } catch (error) {
            console.error(error);
            return error;
        }
    }

    async createResponsible(data) {
        try {
            const response = await api.post(`/authentication/responsibles/`, data);
            showSuccessToast('Responsável criado com sucesso!');
            return response;
        } catch (error) {
            console.error(error);
            showErrorToast('Erro ao criar responsável');
            return error;
        }
    }

    async deleteResponsible(id) {
        try {
            const response = await api.delete(`/authentication/responsibles/${id}/`);
            showSuccessToast('Responsável deletado com sucesso!');
            return response;
        } catch (error) {
            console.error(error);
            showErrorToast('Erro ao deletar responsável');
            return error;
        }
    }
}

export default new ResponsiblesService();