import Vue from "vue";
import axios from "axios";
import {InventoryFilter} from "../store/inventory-filter";
import {InventoryItem} from "../models/inventory-item";
import ADDRESS from "../common/address";

class InventoryService {
  getInventoriesByPaging() {
    return axios.get(
      ADDRESS.PAGING +
        "pageIndex=" +
        InventoryFilter.state.inventorieFilter.PageIndex +
        "&pageSize=" +
        InventoryFilter.state.inventorieFilter.PageSize +
        "&SKUCode=" +
        InventoryFilter.state.inventorieFilter.SKUCode +
        "&inventoryName=" +
        InventoryFilter.state.inventorieFilter.InventoryName +
        "&inventoryGroup=" +
        InventoryFilter.state.inventorieFilter.InventoryGroup +
        "&unit=" +
        InventoryFilter.state.inventorieFilter.Unit +
        "&salePrice=" +
        InventoryFilter.state.inventorieFilter.SalePrice +
        "&status=" +
        InventoryFilter.state.inventorieFilter.Status +
        "&display=" +
        InventoryFilter.state.inventorieFilter.Display +
        "&SKUCodeType=" +
        InventoryFilter.state.inventorieFilter.SKUCodeType +
        "&inventoryNameType=" +
        InventoryFilter.state.inventorieFilter.InventoryNameType +
        "&inventoryGroupType=" +
        InventoryFilter.state.inventorieFilter.InventoryGroupType +
        "&unitType=" +
        InventoryFilter.state.inventorieFilter.UnitType +
        "&salePriceType=" +
        InventoryFilter.state.inventorieFilter.SalePriceType
    );
  }
  InsertInventory(inventory:InventoryItem) {
    return axios.post(ADDRESS.INSERT, inventory);
  }
}

const inventoryService = new InventoryService();

export default inventoryService;
