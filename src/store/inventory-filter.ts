import Vue,{PropType} from "vue";
import Vuex from "vuex";
import InventoryItem from "../models/inventory-item";
import InventoryService from "../services/inventory-service";
import InventoryItemFilter from "../models/inventory-item-filter";

Vue.use(Vuex);

const inventorieFilterDefault = {
  SKUCodeType: "*",
  SKUCode: "",
  InventoryNameType: "*",
  InventoryName: "",
  InventoryGroupType: "*",
  InventoryGroup: "",
  UnitType: "*",
  Unit: "",
  SalePriceType: "<",
  SalePrice: -1,
  Display: -1,
  Status: -1,
  PageIndex: 1,
  PageSize: 15,
};

export const InventoryFilter = new Vuex.Store({
         state: {
           inventorieFilter: inventorieFilterDefault,
         },
         mutations: {
           setPageIndex(state, pageIndex) {
             state.inventorieFilter.PageIndex = pageIndex;
           },
           setPageSize(state, pageSize) {
             state.inventorieFilter.PageSize = pageSize;
           },
           setFilterProperties(state, inventoryFilter: InventoryItemFilter) {
            state.inventorieFilter.Display = inventoryFilter.Display || -1;
            state.inventorieFilter.InventoryGroup = inventoryFilter.InventoryGroup || "";
            state.inventorieFilter.InventoryGroupType = inventoryFilter.InventoryGroupType || "*";
            state.inventorieFilter.InventoryName = inventoryFilter.InventoryName;
            state.inventorieFilter.InventoryNameType = inventoryFilter.InventoryNameType || "*";
            state.inventorieFilter.SKUCode = inventoryFilter.SKUCode || "";
            state.inventorieFilter.SKUCodeType = inventoryFilter.SKUCodeType || "*";
            state.inventorieFilter.SalePrice = inventoryFilter.SalePrice || -1;
            state.inventorieFilter.SalePriceType = inventoryFilter.SalePriceType || ">";
            if (state.inventorieFilter.SalePriceType == "≥") {
                state.inventorieFilter.SalePriceType = ">="
            }
            if (state.inventorieFilter.SalePriceType == "≤ ") {
              state.inventorieFilter.SalePriceType = "<=";
            }
            state.inventorieFilter.Unit = inventoryFilter.Unit || "";
            state.inventorieFilter.Status = inventoryFilter.Status || -1;
            state.inventorieFilter.UnitType = inventoryFilter.UnitType || "*";
           },
         },
         actions: {
           async getByPaging(context) {
             await InventoryService.getInventoriesByPaging().then(
               (data: any) => {
                 data.data.Data.forEach((element: any) => {
                   context.commit("insertInventory", element);
                 });
               }
             );
           },
         },
         getters: {
           inventorieFilter(state) {
             return state.inventorieFilter;
           },
         },
         modules: {},
       });
