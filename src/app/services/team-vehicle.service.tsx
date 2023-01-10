import api from "app/api";
import { Api } from "app/models/api.model";
import { AuthUserModel } from "app/models/auth-user.model";
import { UserModel } from "app/models/user.model";
import loadingService from "./loading.service";

class TeamVehicleService {
  getTeamVehicle = async (id: number, skip: number, limit: number, filter: string): Promise<Api<any>> => {
    console.log("fetch");
    return await api
      .post(`team/${id}/vehicles`, { skip, limit, filter }, { headers: this.getHeaders() })
      .then(response => {
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

export default new TeamVehicleService();