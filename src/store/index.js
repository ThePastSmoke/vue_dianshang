import Vue from "vue";
import Vuex from "vuex";
// 引入请求
import { setSesscat, getSesscat } from "@/utils/storage";
Vue.use(Vuex);
const tokenKye = "token_dianshang";
export default new Vuex.Store({
  state: {
    user: getSesscat(tokenKye),
  },
  getters: {},
  mutations: {
    setUser(state, user) {
      state.user = user;
      setSesscat(tokenKye, user);
    },
  },
  actions: {},
  modules: {},
});
