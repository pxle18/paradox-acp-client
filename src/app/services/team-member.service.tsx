import api from "app/api";
import { Api } from "app/models/api.model";
import { AuthUserModel } from "app/models/auth-user.model";
import { UserModel } from "app/models/user.model";
import loadingService from "./loading.service";

class TeamMemberService {
  getTeamMembers = async (id: number, skip: number, limit: number, filter: string): Promise<Api<any>> => {
    return await api
      .post(`team/${id}/members`, { skip, limit, filter }, { headers: this.getHeaders() })
      .then(response => {
        return response.data;
      });
  }

  deleteTeamMember = async (id: number, player: number): Promise<Api<any>> => {
    loadingService.setLoading(true);

    return await api
      .post(`team/${id}/members/delete`, { player }, { headers: this.getHeaders() })
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

export default new TeamMemberService();