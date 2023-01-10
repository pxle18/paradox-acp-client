import api from "app/api";
import { Api } from "app/models/api.model";
import { AuthUserModel } from "app/models/auth-user.model";
import loadingService from "./loading.service";
import { VehicleModel } from "app/models/vehicle.model";
import { TeamModel } from "app/models/team.model";

class TeamService {
  getAllTeams = async (skip: number, limit: number, filter: string): Promise<Api<any>> => {
    return await api
      .post("team/list", { skip, limit, filter }, { headers: this.getHeaders() })
      .then(response => {
        return response.data;
      });
  }

  getTeam = async (id: number): Promise<Api<TeamModel>> => {
    loadingService.setLoading(true);

    return await api
      .get(`team/${id}`, { headers: this.getHeaders() })
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

export default new TeamService();