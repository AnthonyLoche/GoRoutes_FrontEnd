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

    async getVehicle(id) {
        try {
            const response = await api.get(`/goroutes/vehicles/${id}/`);
            return response;
        } catch (error) {
            console.error(error);
            showErrorToast("Falha ao recuperar o veículo.");
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

    async updateDocumentVehicle(data) {
        try {
            const response = await api.post(`/goroutes/update-document-vehicle/`, data);
            showSuccessToast("Documento atualizado com sucesso!");
            return response;
        } catch (error) {
            console.error(error);
            showErrorToast("Falha ao atualizar o documento.");
            return error;
        }
    }

  async updateVehiclePicture(data) {
    try {
      const response = await api.post(`/goroutes/update-picture-vehicle/`, data);
      showSuccessToast("Foto do veículo atualizada com sucesso!");
      return response;
    } catch (error) {
      console.error(error);
      showErrorToast("Falha ao atualizar a foto do veículo.");
      return error;
    }
  }
}

export default new VehiclesService();
