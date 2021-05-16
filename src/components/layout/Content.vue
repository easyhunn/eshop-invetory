<template>
  <div id="content">
    <div class="content-header">
      <button class="item" v-on:click="displayDialog(1)">
        <div class="d-icon icon-plus-white"></div>
        <div class="item-content">Thêm mới</div>
        <div class="icon-arrow-down-white sm-icon"></div>
      </button>
      <button ref="duplicateInventory" 
        v-on:click="displayDialog(2)" 
        class="item"
        :disabled="disableDuplicate"
      >
        <div class="d-icon icon-duplicate"></div>
        <div class="item-content">Nhân bản</div>
      </button>
      <button ref="updateInventory" 
        class="item" 
        v-on:click="displayDialog(3)"
        :disabled="disableUpdate"
        >
        <div class="d-icon icon-edit"></div>
        <div class="item-content">Sửa</div>
      </button>
      <button ref="deleteStore" v-on:click="displayDeleteAlert" class="item">
        <div class="d-icon icon-delete"></div>
        <div class="item-content" >Xoá</div>
      </button>
      <button class="item" v-on:click="reloadData">
        <div class="d-icon icon-reload-white"></div>
        <div class="item-content">Nạp</div>
      </button>
    </div>
    <div class="table">
      <Table />
    </div>
    <div class="footer">
      <div class="pagging">
        <div class="pagging-left">
          <button
            ref="firstPage"
            v-on:click="firstPage"
            class="d-icon icon-double-prepage"
          ></button>
          <button
            ref="prevPage"
            v-on:click="prevPage"
            class="d-icon icon-prepage "
          ></button>
          <div style="padding: 0 4px">Trang</div>
          <input
            type="number"
            v-model="pageIndex"
            v-on:keyup.enter="changePageIndex"
          />
          <div style="padding: 0 10px 0 4px">Trên {{ totalPage }}</div>
          <button
            v-on:click="nextPage"
            ref="nextPage"
            class="d-icon icon-nextpage"
          ></button>
          <button
            v-on:click="lastPage"
            ref="lastPage"
            class="d-icon icon-double-nextpage"
          ></button>
          <button class="d-icon icon-reload" v-on:click="reloadAllData"></button>
          <select v-model="pageSize" name="" id="" @change="changePageSize">
            <option value="15">15</option>
            <option value="25">25</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
        </div>
        <dir class="pagging-right">
          Hiển thị {{ (pageIndex - 1) * pageSize + 1 }} -{{
            pageIndex * pageSize < totalRecord
              ? pageIndex * pageSize
              : totalRecord
          }}
          Trên {{ totalRecord }} kết quả
        </dir>
      </div>
    </div>
    <Dialog
      ref="Dialog"
      v-show="showDialog"
      :hideDialog="hideDialog"
      @close="hideDialog"
    />

    <!-- region alert delete -->
    <div class="alert-delete" v-if="showDeleteAlert">
      <div class="alert-background"></div>
      <div class="alert-container">
        <div class="alert-header">
          <div class="alert-title">
            Xóa dữ liệu
          </div>
          <button class="d-icon icon-x" v-on:click="hideDeleteAlert"></button>
        </div>
        <div class="alert-content">
          <div class="d-icon m-icon-help m-icon"></div>
          <div class="alert-message">
            Bạn có chắc chắn muốn xóa <b>{{selectedInventory}}</b> khỏi danh sách cửa hàng.
          </div>
        </div>
        <div class="alert-footer">
          <div class="alert-group-button">
            <button v-on:click="deleteInventory" class="button-default btn-red">
              <div class="d-icon icon-delete-white"></div>
              <div class="d-text">Xóa</div>
            </button>
            <button class="button-default btn-3">
              <div class="d-icon icon-x"></div>
              <div class="d-text" v-on:click="hideDeleteAlert">Hủy bỏ</div>
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- end region alert delete -->

    <!-- region preload screen -->
    <div class="preload" v-show="loading">
      <div class="preload-background"></div>
      <div class="preload-container">
        <div class="loader"></div>
      </div>
    </div>
    <!-- end region pre load screen -->
    <!-- Thông báo thành công -->
    <Alert v-if="false" />
    <!-- thông báo lỗi mặc định -->
    <AlertErrorDefault v-if="false" />
    <AlertDeleteError :closeAlert="hideAlertDeleteError" v-if="showAlertDeleteError"/>
  </div>
</template>
<style lang="scss">
#content {
  width: calc(100% - 168px);
  height: calc(100vh - 68px);
  background-color: #e5e6eb;
  margin-left: 150px;
  padding: 8px;
}
.sm-icon {
  margin-left: 7px;
  background-position: center;
  background-repeat: no-repeat;
  border: none;
  outline: none;
}
.d-icon {
  width: 16px;
  height: 16px;
  padding: 0 3px 0 0;
  cursor: pointer;
  background-repeat: no-repeat;
  border: none;
  outline: none;
}
.m-icon {
  width: 44px;
  height: 44px;
}
.disable {
  opacity: 0.5;
  cursor: context-menu !important;
}
.disable:hover {
  background-color: transparent !important;
}
.disable .d-icon {
  cursor: context-menu !important;
}
.disable .item-content {
  cursor: context-menu !important;
}
.content-header {
  display: flex;
  background-color: #2b3173;
  color: #fff;
  height: 36px;
  align-items: center;
}
.content-header .item {
  display: flex;
  justify-content: space-between;
  padding-left: 7px;
  padding-right: 7px;
  height: 100%;
  align-items: center;
  outline: none !important;
  border: none;
  border-left: 1px solid #190472;
  background-color: transparent;
  color: #fff;
  cursor: pointer;
}
.content-header .item:hover {
  background-color: #0088c1;
}
.content-header .item .item-content {
  padding: 0 5px;
  cursor: pointer;
  white-space: nowrap;
}

.table {
  width: 100%;
  height: calc(100% - 94px);
}
.footer {
  width: 100%;
  height: 53px;
  background-color: white;
  padding: 0px;
  margin-left: 1px;
  border-top: 1px solid #e1e1e1;
}
.footer .pagging {
  display: flex;
  flex-direction: row;
  height: 26px;
  width: 100%;
  justify-content: space-between;
  padding: 10px;
}
.pagging .pagging-left {
  display: flex;
  align-items: center;
}
.pagging-left .d-icon {
  border: 1px solid #6b6f9d;
  border-radius: 3px;
  width: 22px;
  height: 22px;
  margin: 1px;
  padding: 0;
}
.pagging-left select {
  padding: 0 4px 0 4px;
  border: 1px solid #d1d1d1;
  border-radius: 3px;
  height: 100%;
  margin: 0 1px 0 1px;
  outline: none !important;
}
.pagging-left input {
  min-height: 12px;
  max-width: 40px;
  min-width: 40px;
  padding: 4px 6px;
  text-align: center;
  margin-right: 6px;
  margin-left: 10px;
  outline: none;
  border: 1px solid #e1e1e1;
  border-radius: 3px;
}
.pagging .pagging-right {
  margin-right: 26px;
  line-height: 4px;
  color: #4b4c4c;
  font-weight: 300;
}

.alert-delete {
  position: absolute;
}
.alert-background {
  width: 100vw;
  height: 100vh;
  background: black;
  opacity: 0.5;
  position: fixed;
  top: 0px;
  left: 0px;
  z-index: 4;
}
.alert-container {
  z-index: 5;
  width: 400px;
  height: 152px;
  background-color: white;
  position: fixed;
  top: calc((100% - 152px) / 2);
  left: calc((100vw - 400px) / 2);
  z-index: 5;
  border-radius: 3px;
}
.alert-container .alert-header {
  width: calc(100% - 30px);
  display: flex;
  justify-content: space-between;
  padding: 10px 14px;
  height: 21px;
  background-color: #f0f0f0;
  border-radius: 3px 3px 0 0;
  border: 1px solid #dfdfdf;
  border-bottom: none;
}
.alert-header .alert-title {
  font-size: 16px;
  font-weight: 600;
  color: #212121;
}
.alert-container .alert-content {
  width: calc(100% - 22px);
  height: 44px;
  padding: 10px;
  border: 1px solid #dfdfdf;
  display: flex;
  justify-content: space-between;
}
.alert-content .alert-message {
  padding-left: 16px;
  width: 332px;
}
.alert-container .alert-footer {
  height: 44px;
  display: flex;
  justify-content: flex-end;
}
.alert-footer .alert-group-button {
  display: flex;
  align-items: center;
  height: 100%;
}
.alert-group-button .button-default {
  height: 30px;
}
.alert-group-button .btn-3:hover {
  border-color: white !important;
}
/* pre load */
.preload {
  position: fixed;
  top: 161px;
}
.preload .preload-background {
  background-color: black;
  opacity: 0.2;
  width: calc(100vw - 170px);
  min-width: 1195px !important;
  height: calc(100vh - 161px);
  z-index: 4;
}
.preload .preload-container {
  position: absolute;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}

.loader {
  border: 5px solid #f3f3f3;
  border-radius: 50%;
  border-top: 5px solid #3498db;
  width: 30px;
  height: 30px;
  -webkit-animation: spin 2s linear infinite; /* Safari */
  animation: spin 2s linear infinite;
}

/* Safari */
@-webkit-keyframes spin {
  0% {
    -webkit-transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
  }
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
<script lang="ts">
import Vue from "vue";

import Table from "../base/the-table.vue";
import Dialog from "../base/the-dialog.vue";
import Alert from "../base/the-alert.vue";
import AlertErrorDefault from "../base/alert-error-default.vue";
import { InventoryFilter } from "../../store/inventory-filter";
import {InventoryStore} from "../../store/inventory";
import { mapGetters } from "vuex";
import AlertDeleteError from "../base/alert-delete-error.vue";
import {SaveType} from "../../core/enums/save-type";

export default Vue.extend({
  name: "Content",
  components: {
    Table,
    Dialog,
    Alert,
    AlertErrorDefault,
    AlertDeleteError
  },
  data: function() {
    return {
      showDialog: false,
      showDeleteAlert: false,
      pageSize: 15,
      pageIndex: 1,
      totalPage: 0,
      selectedInventory: "",
      disableDuplicate: false,
      disableUpdate: false,
      showAlertDeleteError: false
    };
  },
  methods: {
    // Tải lại dữ liệu toàn bộ trang
    //Created By: VM Hùng(16/05/2021)
    reloadAllData() {
      this.pageSize = 15;
      this.pageIndex = 1;
      this.changePageIndex();
      this.reloadData;
    },
    //tải lại dữ liệu trang hiện tại
    //Created By: VM Hùng(16/05/2021)
    reloadData() {
      this.$store.dispatch("getByPaging")
    },
    // Hiển thị thông báo xoá lỗi
    //Created By: VM Hùng(16/05/2021)
    hideAlertDeleteError () {
      this.showAlertDeleteError = false;
    },
    // ẩn thông báo xoá lỗi
    //Created By: VM Hùng(16/05/2021)
    displayAlertDeleteError () {
      this.showAlertDeleteError = true;
    },
    // Xoá hàng hoá được chọn
    //Created By: VM Hùng(15/05/2021)
    deleteInventory() {
      //Xoá bản ghi đang được chọn
      if (this.$store.getters.listIdsSize > 1) {
        this.$store.dispatch("DeleteInventories");
      } else {
        this.$store.dispatch("DeleteInventory");
      }

      this.hideDeleteAlert();
    },
    //Chuyển sang trang tiếp theo
    //Created By: VM Hùng(15/05/2021)
    nextPage() {
      if (this.pageIndex < this.totalPage) {
        this.pageIndex++;
        this.changePageIndex();
        
      }
    },
    //Chuyển về trang trước
    prevPage() {
      if (this.pageIndex > 1) {
        this.pageIndex--;
        this.changePageIndex();
      }
    },
    lastPage() {
      if (this.pageIndex != this.totalPage) {
        this.pageIndex = this.totalPage;
        this.changePageIndex();
      }
    },
    firstPage() {
      if (this.pageIndex != 1) {
        this.pageIndex = 1;
        this.changePageIndex();
      }
    },
    //Thay đổi kích thước trang
    async changePageSize() {
      this.pageIndex = 1;
      
      // load data
      await this.$store.dispatch("getByPaging");
    },
    validatePageIndex() {
      // Chuẩn hoá thứ tự trang
      if (this.pageIndex > this.totalPage) this.pageIndex = this.totalPage;
      if (this.pageIndex < 1) this.pageIndex = 1;
    },
    async changePageIndex() {
      // Chuẩn hoá thứ tự trang
      this.validatePageIndex();
      // Thay đổi giá trị thứ tự trang global
      InventoryFilter.commit("setPageIndex", this.pageIndex);
      // load data
      await this.$store.dispatch("getByPaging");
      let prevPage = this.$refs.prevPage as HTMLElement;
      let lastPage = this.$refs.lastPage as HTMLElement;
      let nextPage = this.$refs.nextPage as HTMLElement;
      let firstPage = this.$refs.firstPage as HTMLElement;

      if (this.pageIndex <= 1) {
        prevPage.classList.add("disable");
        firstPage.classList.add("disable");
      } else {
        prevPage.classList.remove("disable");
        firstPage.classList.remove("disable");
      }
      if (this.pageIndex >= this.totalPage) {
        lastPage.classList.add("disable");
        nextPage.classList.add("disable");
      } else {
        lastPage.classList.remove("disable");
        nextPage.classList.remove("disable");
      }
    },
    // Hiện dialog
    //type:
    // 1: thêm
    // 3: sửa
    // 2: nhân bản
    displayDialog(type: number) {
      this.$store.commit("setFormType", type)
      this.showDialog = true;
      let dialog = this.$refs.Dialog as any;
      if (type != 1) this.$store.dispatch("getInventoriesDetail");
      // xoá thông tin chi tiết
      else this.$store.commit("clearInventoriesDetail")
      dialog.showDialog(type);
    },
    InsertInventory() {
      this.showDialog = true;
      let dialog = this.$refs.Dialog as any;
      dialog.showDialog(1);
    },
    //Ẩn dialog thêm/sửa
    hideDialog() {
      this.$store.commit("setFormType", 0)
      this.showDialog = false;
    },
    //Hiện dialog xoá
    displayDeleteAlert() {
      if (this.selectedIdsSize > 1) {
        this.selectedInventory = "các bản ghi đã chọn";
      } else {
        this.selectedInventory = InventoryStore.state.inventoryName;
      }
      
      this.showDeleteAlert = true;
    },
    //Ẩn dialog xoá
    hideDeleteAlert() {
      this.showDeleteAlert = false;
    },
  },
  computed: {
    ...mapGetters({
      totalRecord: "totalRecord",
      loading: "loading",
      selectedIdsSize: "listIdsSize",
      error: "error"
    }),
  },

  watch: {
    totalRecord() {
      let extend = this.totalRecord % this.pageSize;
      let total: any = this.totalRecord / this.pageSize;
      if (extend == 0) {
        this.totalPage = parseInt(total);
      } else {
        this.totalPage = parseInt(total) + 1;
      }
      // chặn nhân bản sửa khi không có bản ghi
      if (this.totalRecord < 1) {
       this.disableDuplicate = true;
       this.disableUpdate = true; 
      } else {
        this.disableDuplicate = false;
        this.disableUpdate = false; 
      }
    },
    error() {
      // lỗi xoá thất bại
      this.displayAlertDeleteError();
    },

    selectedIdsSize() {
      var duplicate = this.$refs.duplicateInventory as HTMLElement;
      var update = this.$refs.updateInventory as HTMLElement;

      if (this.selectedIdsSize > 1) {
        this.disableDuplicate = true;
        this.disableUpdate = true; 
        duplicate.classList.add("disable")
        update.classList.add("disable")
      } else {
        this.disableDuplicate = false;
        this.disableUpdate = false; 
        duplicate.classList.remove("disable")
        update.classList.remove("disable")
      }
    }
  },
  mounted: function() {
    let prevPage = this.$refs.prevPage as HTMLElement;
    prevPage.classList.add("disable");
    let firstPage = this.$refs.firstPage as HTMLElement;
    firstPage.classList.add("disable");
  },
});
</script>
