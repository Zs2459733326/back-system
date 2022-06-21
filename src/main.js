import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue'
import router from '@/router/index'
import 'font-awesome/css/font-awesome.min.css'
Vue.use(ElementUI);
Vue.config.productionTip = false

new Vue({
  
  beforeCreate() {
    Vue.prototype.$bus = this
  },
  mounted(){
  //  console.log(Vue.prototype.$bus); 
  },
  render: h => h(App),
  router
}).$mount('#app')
