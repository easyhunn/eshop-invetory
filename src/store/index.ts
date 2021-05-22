import Vue from "vue";
import Vuex from "vuex";
import InventoryItem from "../models/inventory-item";
import InventoryService from "../services/inventory-service";
import {InventoryStore} from "./inventory";
import CommonFuncion from "../services/common";


Vue.use(Vuex);
// Trạng thái mặc định của store
// Created By: VM Hùng(16/05/2021)
const getDefaultState = () => {
  return {
    inventories: Array<InventoryItem>(),//danh sách tất cả hàng hoá hiển thị
    inventoriesDetail: Array<InventoryItem>(),// danh sách hàng hoá con
    selectedInventoriesDetailId: Array<string>(),// danh sách hàng hoá chi tiết chọn để xoá 
    colors: Array<string>(),
    selectedIds: Array<string>(), // Danh sách id được chọn
    totalRecord: 0,
    loading: false,
    success: true,
    errorMsg: "",
    errorCode:"",
    formType: 0
  };
};
export default new Vuex.Store({
  state: {
    inventories: Array<InventoryItem>(),
    inventoriesDetail: Array<InventoryItem>(), // danh sách hàng hoá con
    selectedInventoriesDetailId: Array<string>(), // danh sách hàng hoá chi tiết chọn để xoá
    colors: Array<string>(),
    selectedIds: Array<string>(),
    totalRecord: 0,
    loading: false,
    success: true,
    errorMsg: "",
    errorCode: "",
    formType: 0,
  },
  mutations: {
    setFormType(state, type: number) {
      state.formType = type;
    },
    // Thêm thông tin hàng hoá
    // Created By: VM Hùng(14/05/2021)
    insertInventory(state, inventory) {
      state.inventories.push(inventory);
    },
    // Thêm chi tiết hàng hoá vào store
    insertInventoryDetail(state, inventoryDetail: InventoryItem) {

      // Lấy Id cha là id bản ghi đang đc chọn
      inventoryDetail.ParentId = InventoryStore.state.inventoryId;
      state.inventoriesDetail.push(inventoryDetail);
      if (inventoryDetail.Color) state.colors.push(inventoryDetail.Color);
    },
    clearInventoriesDetail(state) {
      state.inventoriesDetail = [];
      state.colors = [];
      state.selectedInventoriesDetailId = [];
    },

    setTotalRecord(state, totalRecord) {
      state.totalRecord = totalRecord;
    },
    // Xoá toàn bộ dữ liệu store
    // Created By: VM Hùng(14/05/2021)
    clearData(state) {
      Object.assign(state, getDefaultState());
    },
    // Bắt đầu tải lại dữ liệu
    // Created By: VM Hùng(14/05/2021)
    startLoading(state) {
      state.success = true;
      state.loading = true;
    },
    // Tải dữ liệu thành công
    // Created By: VM Hùng(14/05/2021)
    stopLoading(state) {
      state.loading = false;
    },
    // Khi có lỗi
    // Created By: VM Hùng(14/05/2021)
    setError(state, [errorMsg, errorCode]) {
      state.success = false;
      state.errorMsg = errorMsg;
      state.errorCode = errorCode;
    },
    setSuccessStatus(state, status: boolean) {
      state.success = status;
    },
    // Thêm id của bản ghi đã được chọn
    // Created By: VM Hùng(15/05/2021)
    addSelectedId(state, id: string) {
      state.selectedIds.push(id);
    },
    // xoá id bản ghi đã được chọn
    // Created By: VM Hùng(14/05/2021)

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
    //Thêm mới hàng hoá và thông tin chi tiết của hàng hoá
    //Created by: VM Hùng(15/05/2021)
    async InsertInventory(context, inventoryItem: InventoryItem) {
      if (inventoryItem.Status) inventoryItem.Status = 1;
      else inventoryItem.Status = 0;
      // Thêm thông tin hàng hoá
      if (this.state.success) {
        await InventoryService.InsertInventory(inventoryItem)
          .then(async (data: any) => {
             // Thêm thông tin chi tiết bản ghi
            if (this.state.inventoriesDetail.length > 0) {
              for (let inventory of this.state.inventoriesDetail) {
                if (this.state.success) {
                  await this.dispatch("InsertInventoryDetail", inventory);
                } else {
                  return;
                }
              }
            }
            // Tải lại trang
            if (this.state.success)
            await this.dispatch("getByPaging");
          })
          .catch((e) => {
            context.commit("setError", [
              inventoryItem.SKUCode,
              e.response.data.errorCode,
            ]);
          });
      }
    },
    // Thêm mới chi tiết hàng hoá (thêm/sửa)
    //Created by: VM Hùng(15/05/2021)
    async InsertInventoryDetail(context, inventoryItem: InventoryItem) {
      if (inventoryItem.Status) inventoryItem.Status = 1;
      else inventoryItem.Status = 0;
      if (this.state.success) {
        await InventoryService.InsertInventoryDetail(inventoryItem)
          .then((data: any) => {
            // console.log("Thêm thành công");
          })

          .catch((e) => {
            console.log(e.response.data);
            context.commit("setError", [
              inventoryItem.SKUCode,
              e.response.data.errorCode,
            ]);
            this.state.success = false;
          });
      }
    },
    // Sửa thông tin hàng hoá
    // Created By: VM Hùng (16/05/2021)
    async UpdateInventory(context: any, inventoryItem: InventoryItem) {
    
      if (this.state.success) {
        await InventoryService.UpdateInventory(
          InventoryStore.state.inventoryId,
          inventoryItem
        )
          .then(async (data: any) => {
            // xoá thông tin chi tiết được chọn
            // console.log(this.state.selectedInventoriesDetailId);
            if (this.state.selectedInventoriesDetailId.length > 0) {
              for (let inventoryId of this.state.selectedInventoriesDetailId) {
              
                if (inventoryId) await InventoryService.DeleteInventory(inventoryId);
              }
            }
            // Thêm/sửa thông tin chi tiết bản ghi
            if (this.state.inventoriesDetail.length > 0) {
              for (let inventory of this.state.inventoriesDetail) {
     
                if (this.state.success)
                  await this.dispatch("InsertInventoryDetail", inventory);
                else return;
              }
            }
            if (this.state.success) this.dispatch("getByPaging");
            
          })
          .catch((e) => {
            context.commit("setError", [
              e.response.data.message,
              e.response.data.errorCode,
            ]);
          });
      }
    },
    // Xoá 1 hàng hoá
    // Created By: VM Hùng(16/05/2021)
    async DeleteInventory(context: any, inventoryItem: InventoryItem) {
      await context.commit("startLoading");
      await InventoryService.DeleteInventory(InventoryStore.state.inventoryId)
        .then((data: any) => {
          this.dispatch("getByPaging");
        })
        .catch((e) => {
          context.commit("setError", [
            e.response.data.message,
            e.response.data.errorCode,
          ]);
        });
      context.commit("stopLoading");
    },
    // Xoá nhiều hàng hoá
    // Created By:VM Hùng(16/05/2021)
    async DeleteInventories(context: any) {
      await context.commit("startLoading");
      await InventoryService.DeleteInventories(this.state.selectedIds.join(","))
        .then((data: any) => {
          this.dispatch("getByPaging");
        })
        .catch((e) => {
          this.dispatch("getByPaging");
          context.commit("setError", [
            e.response.data.message,
            e.response.data.errorCode,
          ]);
        });
      context.commit("stopLoading");
    },
    async getInventoriesDetail(context: any) {
      await context.commit("clearInventoriesDetail");
      if (InventoryStore.state.inventoryId) {
        await InventoryService.GetInventoriesByParentId(
          InventoryStore.state.inventoryId
        )
          .then((data: any) => {
            if (data.data) {
              data.data.forEach((element: any) => {
                context.commit("insertInventoryDetail", element);
              });
            } else {
              context.commit("setTotalRecord", 0);
            }
          })
          .catch((e) => {
            console.log(e);
          });
      } else {
        this.commit("clearInventoriesDetail");
      }
    },
    // Xoá
    DeleteInventoryDetailByColor(context, color: string) {
      // Xoá chi tiết hàng hoá
      this.state.inventoriesDetail = this.state.inventoriesDetail.filter(
        function(item: InventoryItem) {
          if (item.Color) return item.Color != color;
        }
      );
      // xoá màu sắc chi tiết hàng hoá
      this.state.colors = this.state.colors.filter(function(item: string) {
        if (item) return item != color;
      });
    },
    // Xoá chi tiết hàng hoá theo màu sắc
    // Created By: VM Hùng (16/05/2021)
    DeleteInventoryDetailByCompareColor(context, color: Array<string>) {
      // this.state.inventoriesDetail = this.state.inventoriesDetail.filter(
      //   function(item: InventoryItem) {
      //     if (item.Color) return color.includes(item.Color);
      //     return false;
      //   }
      // );
      for (var i = this.state.inventoriesDetail.length - 1; i >= 0; --i) {
        let inventory = this.state.inventoriesDetail[i];
        if (!color.includes(inventory.Color || "")) {
          // Xoá danh sách màu, hàng hoá không còn tồn tại
          this.state.inventoriesDetail.splice(i, 1);
          this.state.colors.splice(i, 1);
          // Kiểm tra id không rỗng -> thêm vào danh sách cần xoá
          if (inventory.InventoryId != "00000000-0000-0000-0000-000000000000")
            this.state.selectedInventoriesDetailId.push(
              inventory.InventoryId || ""
            );
        }
      }
    },
    // Cập nhật tên chi tiết hàng hoá
    // Created By: VM Hùng(17/05/2021)
    UpdateInventoriesDetailByParent(context, [name, code]) {
      this.state.inventoriesDetail.forEach((inventory: InventoryItem) => {
        inventory.InventoryName = name + " ("+inventory.Color+")";
        let colorEnglish = CommonFuncion.removeVietnameseTones(inventory.Color||"");
        let suffix = CommonFuncion.getFirstLetter(colorEnglish).toUpperCase();
        if (suffix.length < 2) {
          suffix += CommonFuncion.getFirstLetter(
            colorEnglish.substring(1)
          ).toUpperCase();
        }
        inventory.SKUCode = code + "-" + suffix;
      });
    },
  },
  getters: {
    // Lấy danh sách tất cả các hàng hoá đang hiển thị
    // Created By: VM Hùng(17/05/2021)
    inventories(state) {
      return state.inventories;
    },
    // tông tất cả các bản ghi
    // Created By: VM Hùng(17/05/2021)

    totalRecord(state) {
      return state.totalRecord;
    },
    // Trạng thái tải dữ liệu
    // Created By: VM Hùng(17/05/2021)

    loading(state) {
      return state.loading;
    },
    // thông báo lỗi
    // Created By: VM Hùng(17/05/2021)

    errorMsg(state) {
      return state.errorMsg;
    },
    // số lượng bản ghi đang được chọn
    // Created By: VM Hùng(17/05/2021)

    listIdsSize(state) {
      return state.selectedIds.length;
    },
    //Danh sách các bản ghi chi tiết
    // Created By: VM Hùng(17/05/2021)

    inventoriesDetail(state) {
      return state.inventoriesDetail;
    },
    //Danh sách thuộc tính màu sắc của bản ghi chi tiết
    // Created By: VM Hùng(17/05/2021)

    inventoriesDetailColor(state) {
      return state.colors;
    },
    // Trạng thái lấy dữ liệu thành công
    // Created By: VM Hùng(17/05/2021)
    success(state) {
      return state.success;
    },
  },
  modules: {},
});
