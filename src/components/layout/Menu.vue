<template>
  <div class="menu-side-bar">
    <!--logo trang cukcuk-->
    <div class="logo-site">
      <a href="../" tooltips="MISA eShop">
        <div class="logo-icon"></div>
      </a>
    </div>
    <!--các tính năng trong menu-->
    <div class="nav-content">
      <a class="nav-item" href="../">
        <div class="nav-item-icon icon-overview"></div>
        <div class="nav-item-text">Tổng quan</div>
      </a>
      
      <a class="nav-item">
        <div class="nav-item-icon icon-report"></div>
        <div class="nav-item-text">Báo cáo</div>
      </a>
      <a class="nav-item">
        <div class="nav-item-icon icon-order"></div>
        <div class="nav-item-text">Đơn hàng</div>
      </a>
      <a class="nav-item" href="/store">
        <div class="nav-item-icon icon-shoppingCart"></div>
        <div class="nav-item-text">Mua hàng</div>
      </a>
      <a class="nav-item">
        <div class="nav-item-icon icon-gift"></div>
        <div class="nav-item-text">Khuyễn mại</div>
      </a>

      <a class="nav-item">
        <div class="nav-item-icon icon-category"></div>
        <div class="nav-item-text">Quản lý cửa hàng</div>
      </a>
      <a class="nav-item last-nav-item">
        <div class="nav-item-icon icon-stock"></div>
        <div class="nav-item-text">Hàng hoá</div>
      </a>
    </div>
  </div>
</template>

<style scoped>
/*thanh menu*/
.menu-side-bar {
  float: left;
  width: 150px;
  height: 100vh;
}
/*logo cukcuk*/
.menu-side-bar .logo-site {
  height: 52px;
  width: 100%;
  align-items: center;
  cursor: pointer;
  background-color: #1e235a;
  color: #ffffff;
  font-weight: 600;
}


.menu-side-bar .logo-site .logo-icon {
  background-image: url("../../assets/Icon/Logo_Full_White.png");
  width: 100%;
  height: 100%;
  background-size: contain;
  background-repeat: no-repeat;
}

/*thanh menu dưới logo*/
.menu-side-bar .nav-content {
  width: 100%;
  height: calc(100vh - 52px);
  background-color: #2b3173;
}

.menu-side-bar .nav-content .nav-item {
  width: 100%;
  height: 40px;
  font-weight: 300;
  display: flex;
  align-items: center;
  color: #aaacc7;
  cursor: pointer;
  line-height: 17px;
}

.nav-item:hover {
  color: #ffffff !important;
  background-color: #1e235a !important;
}
.menu-side-bar .nav-content .nav-item:hover {
  background-color: #e5e5e5;
}

.menu-side-bar .nav-content .nav-item:active {
  background-color: #019160;
  font-family: GoogleSans-Medium;
}

.nav-item .nav-item-icon {
  background-repeat: no-repeat;
  height: 38px;
  width: 22px;
  margin-left: 8px;
  margin-right: 10px;
}
.last-nav-item {
  border-top: 1px solid #1E235A;
}
</style>

<script>

export default {
  
}
</script>