import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue'
import router from '@/router/index'
import 'font-awesome/css/font-awesome.min.css'
// import $axios from 'axios';
import axiosPro from '@/api/axios'
import * as echarts from 'echarts'

// Vue.prototype.$axios = $axios
Vue.prototype.axiosPro = axiosPro
Vue.prototype.$echarts = echarts
Vue.use(ElementUI);
Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  let flag = localStorage.getItem("tokens")
  if (!flag) {
    if (to.path !== '/login') {
      next('/login')
    } else {
      next()
    }
  }else {
    next()
  }
})
new Vue({

  beforeCreate() {
    Vue.prototype.$bus = this
  },
  mounted() {
    //  console.log(Vue.prototype.$bus); 
  },
  render: h => h(App),
  router
}).$mount('#app')
