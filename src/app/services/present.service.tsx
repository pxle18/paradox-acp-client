import axios, { AxiosResponse } from "axios";
import authService from "./auth.service";

const API_URL = "https://xmas.prdx.to:8443/v1/";

class PresentService {
  openPresent = async(): Promise<any> => {
    await authService.checkLoggedIn().then(response => {
      if(!response.success) return {
        success: false,
        content: "Du bist nicht eingeloggt!"
      }
    });

    return axios
      .get(API_URL + "present/open", { headers: authService.getHeaders() } )
      .then(response => {
        return response.data;
      });
  }
}

export default new PresentService();