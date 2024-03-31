import Vue from 'vue'
import App from './App.vue'
import Element from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import router from '@/router';
import axios from "axios";
// tools
// 引用lib-flexible插件
import './lib/lib-flexible'   //复制出来放在src文件夹下
//import 'lib-flexible'    //直接在node_modules中修改

Vue.use(Element);

Vue.config.productionTip = false
Vue.prototype.$httpUrl = 'http://localhost:8888'
Vue.prototype.$axios = axios;

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
