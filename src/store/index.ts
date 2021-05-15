import Vue from "vue";
import Vuex from "vuex";
import InventoryItem from "../models/inventory-item";
import InventoryService from "../services/inventory-service";

Vue.use(Vuex);
const getDefaultState = () => {
  return {
    inventories: Array<InventoryItem>(),
    totalRecord: 0,
    loading: false,
    success: true,
    errorMsg: ""
  };
};
export default new Vuex.Store({
  state: {
    inventories: Array<InventoryItem>(),
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
    }
  },
  actions: {
    //Lấy danh sách hàng hoá cùng phân trang, lọc
    //Created by: VM Hùng(15/05/2021)
    async getByPaging(context) {
      await context.commit("clearData");
      await context.commit("startLoading");
      await InventoryService.getInventoriesByPaging()
        .then((data: any) => {
          data.data.Data.forEach((element: any) => {
            context.commit("insertInventory", element);
          });
          context.commit("setTotalRecord", data.data.TotalRecord);
        })
        .catch(e => {
          context.commit("setError", e.response.data);
        })
        context.commit("stopLoading");
    },
    //Thêm mới 1 hàng hoá
    //Created by: VM Hùng(15/05/2021)
    async InsertInventory(context, inventoryItem:InventoryItem) {
      await context.commit("startLoading");
      await InventoryService.InsertInventory(inventoryItem)
        .then((data: any) => {
          
        })
        .catch(e => {
          console.log(e);
          context.commit("setError", e.response.data);
        })
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
  },
  modules: {},
});
