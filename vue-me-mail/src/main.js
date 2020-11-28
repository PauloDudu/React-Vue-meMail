import Vue from "vue";
import App from "./App.vue";
import router from "./Routes";
import VueToastify from "vue-toastify";
let VueCookie = require('vue-cookie');

Vue.use(VueCookie);
Vue.use(VueToastify);
Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");