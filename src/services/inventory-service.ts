import Vue from "vue";
import axios from "axios";
import {InventoryFilter} from "../store/inventory-filter";
import InventoryItem from "../models/inventory-item";
import ADDRESS from "../core/consts/address";

class InventoryService {
  //Lấy danh sách hàng hoá phân trang cùng lọc
  //Created By: VM Hùng (15/05/2021)
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
  //THêm mới 1 hàng hoá
  //Created By: VM Hùng (15/05/2021)
  InsertInventory(inventory: InventoryItem) {

    return axios.post(ADDRESS.INSERT, inventory);
  }
  DeleteInventory(inventoryId:string) {
    return axios.delete(ADDRESS.DELETE + inventoryId);
  }
  //Lấy mã code lớn nhất
  //Created By: VM Hùng (15/05/2021)
  GetMaxCode(prefix: string) {
    return axios.get(ADDRESS.MAXCODE + prefix);
  }
  //Lấy hàng hoá theo mã SKU
  //Created By: VM Hùng (15/05/2021)
  GetBySKUCode(SKUCode: string) {
    return axios.get(ADDRESS.GET_BY_SKUCODE + SKUCode);
  }
  //Lấy hàng hoá theo Id
  //Created By: VM Hùng (15/05/2021)
  GetInventoryById(inventoryId: string) {
    return axios.get(ADDRESS.GET_BY_ID + inventoryId);
  }
  //Sửa thông tin hàng hoá
  //Created By: VM Hùng (15/05/2021)
  UpdateInventory(inventoryId: string, inventory: InventoryItem) {
    return axios.put(ADDRESS.GET_BY_ID + inventoryId, inventory);
  }
  DeleteInventories(inventories:string) {
    return axios.delete(ADDRESS.DELETE_MULTIPLE, {params: {'listId': inventories}});
  }
}

const inventoryService = new InventoryService();

export default inventoryService;
