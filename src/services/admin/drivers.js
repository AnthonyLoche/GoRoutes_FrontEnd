import api from "@/plugins/axios";

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

    async createDriver(data) {
        try {
            const response = await api.post(`/authentication/drivers/`, data);
            return response;
        } catch (error) {
            console.error(error);
            return error;
        }
    }

    async deleteDriver(id) {
        try {
            const response = await api.delete(`/authentication/drivers/${id}/`);
            return response;
        } catch (error) {
            console.error(error);
            return error;
        }
    }
}

export default new DriversService();