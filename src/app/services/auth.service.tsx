import api from "app/api";
import { Api } from "app/models/api.model";
import { AuthUserModel } from "app/models/auth-user.model";
import loadingService from "./loading.service";

class AuthService {
  login = async (username: string, password: string): Promise<Api<any>> => {
    loadingService.setLoading(true);

    return await api
      .post("auth/login", { username, password })
      .then(response => {
        loadingService.setLoading(false);

        return response.data;
      });
  }

  checkLoggedIn = async(): Promise<Api<AuthUserModel>> => {
    const accessToken = localStorage.getItem("accessToken");
    if(accessToken == "" || !accessToken) {
      console.log("Not.");
      return {
        error: "Unauthenticated."
      }
    } 

    return await api
      .get("profile/info", { headers: this.getHeaders() })
      .then(response => {
        console.log(response.data);
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

export default new AuthService();