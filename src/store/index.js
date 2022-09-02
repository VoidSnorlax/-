import Vue from "vue";
import Vuex from "vuex";
import tab from './tab'//引入tab
import user from "./user";//引入user
Vue.use(Vuex);
export default new Vuex.Store({
  modules:{
    tab,//注册
    user//注册
  }
});
