import Vue from "vue";
import Vuex from "vuex";
import InventoryItem from "../models/inventory-item";
import InventoryService from "../services/inventory-service";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    inventories: Array<InventoryItem>(),
    
  },

  getters: {
    //map
    // message(state: InventoryItem) {
    //   return state.message;
    // },
    inventories(state) {
      return state.inventories;
    },
  },

  mutations: {
    // updateMessage(state: InventoryItem, message: string) {
    //  state.message = message;
    // },
    insertInventory(state, inventory) {
      console.log(inventory);
      state.inventories.push(inventory);
    },
  },

  actions: {
    // setMesssage(
    //   // action: ActionContext<Array<InventoryItem>, Array<InventoryItem>>,
    //   message: string
    // ): void {
    //   action.commit("getByPaging");
    // },
    async getByPaging(context, inventoryModel: InventoryItem) {
      await InventoryService.getInventoriesByPaging().then((data: any) => {
        context.commit("insertInventory", inventoryModel);
      });
    },
  },

  modules: {},
});

// InventoryItemName: "",
//     InventoryItemGroup: "",
//     InventoryItemCode: "",
//     PurchasePrice: -1,
//     SalePrice: -1,
//     Status: -1,
//     Unit: "chiếc",
//     Prefix: "",
//     Color: ""
