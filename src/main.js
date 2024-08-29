import Vue from 'vue'
import App from './App.vue'
import Element from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import router from 'src/router';
import axios from "axios";
import store from './store'
import commonMethods from './store/commonMethods'
// 引入iconfont图标
import "./assets/icon/iconfont.css"
import * as echarts from 'echarts';
// tools
// 引用lib-flexible插件
import './lib/lib-flexible'   //复制出来放在src文件夹下
//import 'lib-flexible'    //直接在node_modules中修改


axios.interceptors.request.use(
    config => {
        const token = sessionStorage.getItem('loginToken');
        if (token) {
            config.headers.token = token;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);




Vue.use(Element);
Vue.config.productionTip = false
Vue.prototype.$httpUrl = 'http://localhost:8888'
Vue.prototype.$axios = axios;
Vue.prototype.$echarts = echarts;
Vue.prototype.$commonMethods = commonMethods;

new Vue({
  router,
    store,
  render: h => h(App),
}).$mount('#app')
