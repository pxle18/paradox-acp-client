import api from "app/api";
import { Api } from "app/models/api.model";
import { AuthUserModel } from "app/models/auth-user.model";
import { UserModel } from "app/models/user.model";
import loadingService from "./loading.service";
import { CallbackMessage } from "app/models/callback-message.model";

class UserActionService {
  kick = async (id: number, reason: string): Promise<Api<CallbackMessage>> => {
    loadingService.setLoading(true);

    return await api
      .post(`player/${id}/action/kick`, { reason }, { headers: this.getHeaders() })
      .then(response => {
        loadingService.setLoading(false);

        return response.data;
      });
  }

  timeBan = async (id: number, duration: number, reason: string): Promise<Api<CallbackMessage>> => {
    loadingService.setLoading(true);

    return await api
      .post(`player/${id}/action/time-ban`, { duration, reason }, { headers: this.getHeaders() })
      .then(response => {
        loadingService.setLoading(false);

        return response.data;
      });
  }

  callToSupport = async (id: number): Promise<Api<CallbackMessage>> => {
    loadingService.setLoading(true);

    return await api
      .get(`player/${id}/action/call-to-support`, { headers: this.getHeaders() })
      .then(response => {
        loadingService.setLoading(false);

        return response.data;
      });
  }
  
  reloadInventory = async (id: number): Promise<Api<CallbackMessage>> => {
    loadingService.setLoading(true);

    return await api
      .get(`player/${id}/action/reload-inventory`, { headers: this.getHeaders() })
      .then(response => {
        loadingService.setLoading(false);

        return response.data;
      });
  }

  warn = async (id: number, reason: string): Promise<Api<CallbackMessage>> => {
    loadingService.setLoading(true);

    return await api
      .post(`player/${id}/action/warn`, { reason }, { headers: this.getHeaders() })
      .then(response => {
        loadingService.setLoading(false);

        return response.data;
      });
  }

  suspend = async (id: number): Promise<Api<CallbackMessage>> => {
    loadingService.setLoading(true);

    return await api
      .get(`player/${id}/action/suspend`, { headers: this.getHeaders() })
      .then(response => {
        loadingService.setLoading(false);

        return response.data;
      });
  }

  deSuspend = async (id: number): Promise<Api<CallbackMessage>> => {
    loadingService.setLoading(true);

    return await api
      .get(`player/${id}/action/de-suspend`, { headers: this.getHeaders() })
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

export default new UserActionService();