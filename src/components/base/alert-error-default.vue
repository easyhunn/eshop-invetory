<template>
  <div class="alert-error">
    <div class="alert-background"></div>
    <div class="alert-container">
      <div class="alert-header">
        <div class="alert-title">
          Thông báo
        </div>
        <button @click="this.closeAlert" class="d-icon icon-x"></button>
      </div>
      <div class="alert-content">
        <div class="d-icon icon-exclamation m-icon"></div>
        <div class="alert-message">
          Có lỗi xảy ra! Vui lòng liên hệ MISA.
        </div>
      </div>
      <div class="alert-footer">
        <div class="alert-group-button">
          <button class="button-default btn-red" @click="closeAlert">
            <div class="d-text">OK</div>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.m-icon {
    background-size: contain;
}
.alert-error {
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
  z-index: 5;
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
  padding-right: 16px;
}
.alert-group-button .button-default {
  height: 30px;
  min-width: 60px;
  justify-content: center;
}
.alert-group-button .btn-3:hover {
  border-color: white !important;
}
</style>
<script>
export default {
  name: "AlertErrorDefault",
  props: {
    closeAlert: Function,
  },
}
</script>
