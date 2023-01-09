import api from "app/api";
import { Api } from "app/models/api.model";
import { AuthUserModel } from "app/models/auth-user.model";
import { UserModel } from "app/models/user.model";
import loadingService from "./loading.service";

class UsersService {
  getAllUsers = async (skip: number, limit: number, filter: string): Promise<Api<any>> => {
    return await api
      .post("player/list", { skip, limit, filter }, { headers: this.getHeaders() })
      .then(response => {
        return response.data;
      });
  }

  getUser = async (id: number): Promise<Api<UserModel>> => {
    loadingService.setLoading(true);

    return await api
      .get(`player/${id}`, { headers: this.getHeaders() })
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

export default new UsersService();