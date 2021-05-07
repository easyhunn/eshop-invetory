<template>
  <div class="header">
    <!--hộp thoại lựa chọn cửa hàng-->
    <div class="header-left">
      <div class="header-left-content">
        Hàng hoá
      </div>
    </div>
    <!--avatar, thông báo-->
    <div class="header-right">
      <select name="Store" id="" class="store-option">
        <option value="">
          Chuỗi cửa hàng
        </option>
        <option value="">
          --Kho tổng
        </option>
        <option value="">
          --misard
        </option>
      </select>
      <div class="account-area">
        <div class="d-icon avatar-default"></div>
        <div class="account-name">Vũ Mạnh Hùng</div>
        <div class="d-icon icon-arrow-down sm-icon"></div>
      </div>
      <a class="d-icon icon-support"></a>
      <div style="height: 52px; width: auto; border-right: 1px solid #e1e1e1">
        <a class="d-icon icon-notify sm-icon"></a>
      </div>
      <a class="d-icon icon-help sm-icon"></a>
    </div>
  </div>
</template>
<style scoped>
.d-icon {
  width: 16px;
  height: 18px;
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
  display: block;
  cursor: pointer;
}
.account-area {
  display: flex;
  align-items: center;
}
.sm-icon {
  margin: 17px 17px;
}
.header {
  width: calc(100% - 151px);
  height: 52px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #bbbbbb;
  border-left: 1px solid #bbbbbb;
  margin-left: 150px;
  color: #212121;
}

.header .header-left .header-left-content {
  padding: 18px 0px 18px 21px;
  font-weight: 700;
  font-size: 18px;
  white-space: nowrap;
  z-index: 2;
}
.header .header-right {
  display: flex;
  align-items: center;
}

.header .store-option {
  padding: 7px;
  min-width: 162px;
  margin: 0px;
  height: 32px;
  border: 1px solid #c3c3c3;
  border-radius: 3px;
  outline: none !important;
}   
.header .account-name {
  margin-left: 16px;
  font-weight: bold;
  white-space: nowrap;
  cursor: pointer;
}
.header-right .avatar-default {
  margin-left: 16px;
  width: 30px;
  height: 30px;
}
.header-right .icon-support {
  width: 46px;
  height: 52px;
  background-position: center;
  background-repeat: no-repeat;
}
.header-right .icon-notify {
  background-color: white;
}
</style>
