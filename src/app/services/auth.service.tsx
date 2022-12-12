import axios, { AxiosResponse } from "axios";

const API_URL = "https://xmas.prdx.to:8443/v1/";

class AuthService {
  login = async (username: string, password: string): Promise<any> => {
    return await axios
      .post(API_URL + "auth/login", { username, password })
      .then(response => {
        return response.data;
      });
  }

  loginWithCode = async (christmasCode: string): Promise<any> => {
    return await axios
      .post(API_URL + "auth/login/code", { christmasCode })
      .then(response => {
        return response.data;
      });
  }

  generateChristmasCode = async (): Promise<any> => {
    return await axios
      .get(API_URL + "auth/generate/code")
      .then(response => {
        return response.data;
      });
  }

  checkLoggedIn = async(): Promise<any> => {
    const accessToken = localStorage.getItem("accessToken");
    if(accessToken == "" || !accessToken) return {
      success: false,
      content: "Du bist nicht eingeloggt!"
    }

    return await axios
      .post(API_URL + "auth/check", { accessToken: accessToken })
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

export default new AuthService();