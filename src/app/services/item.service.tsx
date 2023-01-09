import api from "app/api";
import { Api } from "app/models/api.model";
import { AuthUserModel } from "app/models/auth-user.model";
import { UserModel } from "app/models/user.model";
import loadingService from "./loading.service";
import { Inventory, InventorySlot } from "app/models/inventory.model";
import { CallbackMessage } from "app/models/callback-message.model";

class ItemService {
  listAll = async (): Promise<Api<string[]>> => {
    loadingService.setLoading(true);

    return await api
      .get(`item/list`, { headers: this.getHeaders() })
      .then(response => {
        loadingService.setLoading(false);

        return response.data;
      });
  }

  get = async (id: number): Promise<Api<InventorySlot>> => {
    loadingService.setLoading(true);

    return await api
      .get(`item/${id}/get`, { headers: this.getHeaders() })
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

export default new ItemService();