import Vue from "vue";
import Vuex from "vuex";
import InventoryItem from "../models/inventory-item";
import InventoryService from "../services/inventory-service";

Vue.use(Vuex);

//Thông tin hàng hoá đang được chọn
export const InventoryStore = new Vuex.Store({
         state: {
           inventory: {} as InventoryItem,
           inventoryId: "",
           inventoryName: "",
         },

         getters: {
           //map
           // message(state: InventoryItem) {
           //   return state.message;
           // },
           inventory(state) {
             return state.inventory;
           },
         },

         mutations: {
           //
           //Created By: VM Hùng (15/05/2021)
           setInventory(state, inventory) {
             state.inventory = inventory;
           },
           setInventoryId(state, inventoryId) {
             state.inventoryId = inventoryId;
           },
           setInventoryName(state, inventoryName) {
             state.inventoryName = inventoryName;
           },
         },

         actions: {
           // setMesssage(
           //   // action: ActionContext<Array<InventoryItem>, Array<InventoryItem>>,
           //   message: string
           // ): void {
           //   action.commit("getByPaging");
           // },
           //Lấy thông tin hàng hoá theo id
           async getByInventoryId(context) {
             await InventoryService.GetInventoryById(
               this.state.inventoryId
             ).then((data: any) => {
               context.commit("setInventory", data.data);
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
