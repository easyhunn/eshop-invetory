<template>
  <div id="content">
    <div class="content-header">
      <button class="item" v-on:click="displayDialog()">
        <div class="d-icon icon-plus-white"></div>
        <div class="item-content">Thêm mới</div>
        <div class="icon-arrow-down-white sm-icon"></div>
      </button>
      <button ref="duplicateStore" class="item ">
        <div class="d-icon icon-duplicate"></div>
        <div class="item-content">Nhân bản</div>
      </button>
      <button ref="updateStore" class="item">
        <div class="d-icon icon-edit"></div>
        <div class="item-content">Sửa</div>
      </button>
      <button ref="deleteStore" class="item">
        <div class="d-icon icon-delete"></div>
        <div class="item-content">Xoá</div>
      </button>
      <button class="item">
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
          <button ref="firstPage" class="d-icon icon-double-prepage"></button>
          <button ref="prevPage" class="d-icon icon-prepage "></button>
          <div style="padding: 0 4px">Trang</div>
          <input type="text" />
          <div style="padding: 0 10px 0 4px">Trên 5</div>
          <button class="d-icon icon-nextpage"></button>
          <button class="d-icon icon-double-nextpage"></button>
          <button class="d-icon icon-reload"></button>
          <select  name="" id="">
            <option value="15">15</option>
            <option value="25">25</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
        </div>
        <dir class="pagging-right">
          Hiển thị 1
          Trên 50 kết quả
        </dir>
      </div>
    </div>
    <Dialog  ref="Dialog" v-show="showDialog" :hideDialog="hideDialog"/>

    <!-- region alert delete -->
    <div class="alert-delete" v-if="false">
      <div class="alert-background"></div>
      <div class="alert-container">
        <div class="alert-header">
          <div class="alert-title">
            Xóa dữ liệu
          </div>
          <button class="d-icon icon-x"></button>
        </div>
        <div class="alert-content">
          <div class="d-icon m-icon-help m-icon"></div>
          <div class="alert-message">
            Bạn có chắc chắn muốn xóa <b></b> khỏi danh
            sách cửa hàng.
          </div>
        </div>
        <div class="alert-footer">
          <div class="alert-group-button">
            <button class="button-default btn-red">
              <div class="d-icon icon-delete-white"></div>
              <div class="d-text">Xóa</div>
            </button>
            <button class="button-default btn-3">
              <div class="d-icon icon-x"></div>
              <div class="d-text">Hủy bỏ</div>
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- end region alert delete -->

    <!-- region preload screen -->
    <div class="preload" v-show="false">
      <div class="preload-background"></div>
      <div class="preload-container">
        <div class="loader"></div>
      </div>
    </div>
    <!-- end region pre load screen -->
    <!-- Thông báo thành công -->
    <Alert v-if="false"  />
    <!-- thông báo lỗi mặc định -->
    <AlertErrorDefault
      v-if="false"
    />
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

<script>
import Table from "../base/Table.vue";
import Dialog from "../base/Dialog.vue";
import Alert from "../base/Alert.vue";
import AlertErrorDefault from "../base/AlertErrorDefault.vue";
export default {
  name: "Content",
  components: {
    Table,

    Dialog,
    Alert,
    AlertErrorDefault,
  },
  data: function() {
    return {
      showDialog: false
    };
  },
  methods: {
    displayDialog() {
      this.showDialog = true;
      this.$refs.Dialog.showDialog();
      
    },
    hideDialog() {
      this.showDialog = false;
    }
  }
};
</script>
