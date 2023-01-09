import api from "app/api";
import { Api } from "app/models/api.model";
import { AuthUserModel } from "app/models/auth-user.model";
import { UserModel } from "app/models/user.model";
import loadingService from "./loading.service";
import { Inventory, InventorySlot } from "app/models/inventory.model";
import { CallbackMessage } from "app/models/callback-message.model";

class VehicleInventoryService {
  getVehicleInventory = async (id: number): Promise<Api<Inventory>> => {
    loadingService.setLoading(true);

    return await api
      .get(`vehicle/${id}/inventory`, { headers: this.getHeaders() })
      .then(response => {
        loadingService.setLoading(false);

        return response.data;
      });
  }

  addItem = async (id: number, item: string, amount: number): Promise<Api<CallbackMessage & any>> => {
    loadingService.setLoading(true);

    return await api
      .post(`vehicle/${id}/inventory/add`, { item, amount }, { headers: this.getHeaders() })
      .then(response => {
        loadingService.setLoading(false);

        return response.data;
      });
  }

  deleteItemBySlot = async (id: number, slot: number): Promise<Api<CallbackMessage>> => {
    loadingService.setLoading(true);

    return await api
      .post(`vehicle/${id}/inventory/delete`, { slot }, { headers: this.getHeaders() })
      .then(response => {
        loadingService.setLoading(false);

        return response.data;
      });
  }

  clearInventory = async (id: number): Promise<Api<CallbackMessage>> => {
    loadingService.setLoading(true);

    return await api
      .get(`vehicle/${id}/inventory/clear`, { headers: this.getHeaders() })
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

export default new VehicleInventoryService();