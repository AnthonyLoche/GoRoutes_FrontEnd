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

    async getRouteByIdToInit(id){
        try{
            const response = await api.get(`/goroutes/routes/${id}/  `);
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

    async getRouteByDriverId(driverId) {
        try {
            const response = await api.get(`/goroutes/filter-my-active-route/${driverId}/`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching route for driver ID ${driverId}:`, error);
            throw error;
        }
    }

    async filterMyDriverRoutes(driverId) {
        try {
            const response = await api.get(`/goroutes/filter-my-driver-routes/${driverId}/`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching routes for driver ID ${driverId}:`, error);
            throw error;
        }
    }

      async takeMyDailyRoute(id){
        try{
            const response = await api.get(`/goroutes/check-active-route-driver/${id}`);
            return response
        }catch(error){
            console.error(error);
        }
    }

}

export default new GoRoutesService();