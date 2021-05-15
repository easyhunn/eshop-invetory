import Vue from "vue";
import Vuex from "vuex";
import InventoryItem from "../models/inventory-item";
import InventoryService from "../services/inventory-service";
import {InventoryStore} from "./inventory";

Vue.use(Vuex);
const getDefaultState = () => {
  return {
    inventories: Array<InventoryItem>(),
    selectedIds: [""],
    totalRecord: 0,
    loading: false,
    success: true,
    errorMsg: "",
  };
};
export default new Vuex.Store({
  state: {
    inventories: Array<InventoryItem>(),
    selectedIds: [""],
    totalRecord: 0,
    loading: false,
    success: true,
    errorMsg: "",
  },
  mutations: {
    insertInventory(state, inventory) {
      state.inventories.push(inventory);
    },
    setTotalRecord(state, totalRecord) {
      state.totalRecord = totalRecord;
    },
    clearData(state) {
      Object.assign(state, getDefaultState());
    },
    startLoading(state) {
      state.success = true;
      state.loading = true;
    },
    stopLoading(state) {
      state.loading = false;
    },
    setError(state, errorMsg) {
      state.success = false;
      state.errorMsg = errorMsg;
    },
    addSelectedId(state, id: string) {
      state.selectedIds.push(id);
    },
    removeSelectedId(state, id) {
      let index = state.selectedIds.indexOf(id);
      if (index > -1) {
        state.selectedIds.splice(index, 1);
      }
    },
  },
  actions: {
    //Lấy danh sách hàng hoá cùng phân trang, lọc
    //Created by: VM Hùng(15/05/2021)
    async getByPaging(context) {
      await context.commit("clearData");
      await context.commit("startLoading");
      await InventoryService.getInventoriesByPaging()
        .then((data: any) => {
          if (data.data.Data) {
            data.data.Data.forEach((element: any) => {
              context.commit("insertInventory", element);
            });
            context.commit("setTotalRecord", data.data.TotalRecord);
          } else {
            context.commit("setTotalRecord", 0);
          }
        })
        .catch((e) => {
          console.log(e);
        });
      context.commit("stopLoading");
    },
    //Thêm mới 1 hàng hoá
    //Created by: VM Hùng(15/05/2021)
    async InsertInventory(context, inventoryItem: InventoryItem) {
      if (inventoryItem.Status) inventoryItem.Status = 1;
      else inventoryItem.Status = 0;
      await context.commit("startLoading");
      await InventoryService.InsertInventory(inventoryItem)
        .then((data: any) => {
          console.log("Thêm thành công");
          this.dispatch("getByPaging");
        })
        .catch((e) => {
          context.commit("setError", e.response.data.message);
        });
      context.commit("stopLoading");
    },
    async UpdateInventory(context: any, inventoryItem: InventoryItem) {
      await context.commit("startLoading");
      await InventoryService.UpdateInventory(
        InventoryStore.state.inventoryId,
        inventoryItem
      )
        .then((data: any) => {
          this.dispatch("getByPaging");
        })
        .catch((e) => {
          context.commit("setError", e.response.data.message);
        });
      context.commit("stopLoading");
    },
    async DeleteInventory(context: any, inventoryItem: InventoryItem) {
      await context.commit("startLoading");
      await InventoryService.DeleteInventory(InventoryStore.state.inventoryId)
        .then((data: any) => {
          this.dispatch("getByPaging");
        })
        .catch((e) => {
          context.commit("setError", e.response.data.message);
        });
      context.commit("stopLoading");
    },
    async DeleteInventories(context: any) {
      await context.commit("startLoading");
      await InventoryService.DeleteInventories(this.state.selectedIds.join(","))
        .then((data: any) => {
          this.dispatch("getByPaging");
        })
        .catch((e) => {
          context.commit("setError", e.response.data.message);
        });
      context.commit("stopLoading");
    },
  },
  getters: {
    inventories(state) {
      return state.inventories;
    },
    totalRecord(state) {
      return state.totalRecord;
    },
    loading(state) {
      return state.loading;
    },
    error(state) {
      return state.success;
    },
    errorMsg(state) {
      return state.errorMsg;
    },
    listIdsSize(state) {
      return state.selectedIds.length;
    }
  },
  modules: {},
});
