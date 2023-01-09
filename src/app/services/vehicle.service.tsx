import api from "app/api";
import { Api } from "app/models/api.model";
import { AuthUserModel } from "app/models/auth-user.model";
import loadingService from "./loading.service";
import { VehicleModel } from "app/models/vehicle.model";

class VehicleService {
  getAllVehicles = async (skip: number, limit: number, filter: string): Promise<Api<any>> => {
    return await api
      .post("vehicle/list", { skip, limit, filter }, { headers: this.getHeaders() })
      .then(response => {
        return response.data;
      });
  }

  getVehicle = async (id: number): Promise<Api<VehicleModel>> => {
    loadingService.setLoading(true);

    return await api
      .get(`vehicle/${id}`, { headers: this.getHeaders() })
      .then(response => {
        loadingService.setLoading(false);

        return response.data;
      });
  }

  getHeaders() {
    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem("accessToken")}`
    };
  }
}

export default new VehicleService();