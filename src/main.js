import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
// 引入初始化css
import "@/style/reset.css";
// 导入字体图标
import "@/style/fonts/iconfont.css";
// 引入eleui组件
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
Vue.use(ElementUI);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
