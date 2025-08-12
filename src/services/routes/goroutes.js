import api from "@/plugins/axios";

class GoRoutesService {
    async getRoutes() {
        try {
            const response = await api.get("/goroutes/filter-active-routes/");
            return response.data;
        } catch (error) {
            console.error("Error fetching routes:", error);
            throw error;
        }
    }

    async getRouteById(id) {
        try {
            const response = await api.get(`/goroutes/filter-active-routes/${id}`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching route with ID ${id}:`, error);
            throw error;
        }
    }

    async getActiveRoutes(){
        try {
            const response = await api.get("/goroutes/filter-active-routes/");
            return response.data;
        } catch (error) {
            console.error("Error fetching active routes:", error);
            throw error;
        }
    }
}

export default new GoRoutesService();