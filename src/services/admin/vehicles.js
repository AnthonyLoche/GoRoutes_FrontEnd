import api from "@/plugins/axios";
import { showSuccessToast, showErrorToast } from "@/utils/toast";

class VehiclesService {
    async getVehicles() {
        try {
            const response = await api.get(`/goroutes/vehicles/`);
            return response;
        } catch (error) {
            console.error(error);
            showErrorToast("Falha ao recuperar os veículos.");
            return error;
        }
    }

    async createVehicle(data) {
        try {
            const response = await api.post(`/goroutes/vehicles/`, data);
            showSuccessToast("Veículo criado com sucesso!");
            return response;
        } catch (error) {
            console.error(error);
            showErrorToast("Falha ao criar o veículo.");
            return error;
        }
    }

    async deleteVehicle(id) {
        try {
            const response = await api.delete(`/goroutes/vehicles/${id}/`);
            showSuccessToast("Veículo excluído com sucesso!");
            return response;
        } catch (error) {
            console.error(error);
            showErrorToast("Falha ao excluir o veículo.");
            return error;
        }
    }
}

export default new VehiclesService();