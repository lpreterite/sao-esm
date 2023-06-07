import Vue from "vue";
import App from "./App.vue";
import { default as HelloWorld, yeah } from "../src/main";

window.yeah = yeah

Vue.use(HelloWorld())
Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount("#app");
