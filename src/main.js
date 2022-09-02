import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import './assets/scss/reset.scss'//引入项目初始化文件
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import http from '@/Api/config'
import './mock'

Vue.use(ElementUI);//vue中使用第三方插件都要使用use方法
Vue.prototype.$http = http//挂载到vue实例

Vue.config.productionTip = false;//语法校验关闭

router.beforeEach((to, from, next) => {
  store.commit('getToken')//调用设置token方法
  let token = store.state.user.token//将vuex中的token赋值给变量
  if (!token && to.name !== 'login') {//进行判断如果token不存在或者页面不为登录页就跳转到登录页
    next({ name: 'login' })
  } else {
    next()//否咋继续
  }
})//通过(前置)路由守卫防止用户非法访问

new Vue({
  router,//注册vue路由
  store,//注册vuex
  render: (h) => h(App),
  created() {
    store.commit('addMenu', router)
  }
}).$mount("#app");
