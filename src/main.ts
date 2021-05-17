import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import CommonFuncion from "./services/common";
// import vuetify from './plugins/vuetify'

Vue.config.productionTip = false;

Vue.filter('formatMoney', function (value:any) {
      if (!value) return '0'
      value = value.toString();
      return CommonFuncion.stringToCurrency(value);
})

new Vue({
  router,
  store,
  // vuetify,
  render: (h) => h(App),
}).$mount("#app");
