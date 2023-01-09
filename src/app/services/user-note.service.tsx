import api from "app/api";
import { Api } from "app/models/api.model";
import { AuthUserModel } from "app/models/auth-user.model";
import { UserModel } from "app/models/user.model";
import loadingService from "./loading.service";

class UserNoteService {
  getUserNote = async (id: number): Promise<Api<any>> => {
    loadingService.setLoading(true);

    return await api
      .get(`player/${id}/note`, { headers: this.getHeaders() })
      .then(response => {
        loadingService.setLoading(false);

        return response.data;
      });
  }

  updateUserNote = async (id: number, note: string): Promise<Api<any>> => {
    return await api
      .post(`player/${id}/note/update`, { note }, { headers: this.getHeaders() })
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

export default new UserNoteService();