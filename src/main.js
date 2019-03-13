import Vue from 'vue'
import App from './App.vue'
import '@/assets/reset.css'
import VueRouter from 'vue-router';
// import VeeValidate from 'vee-validate';
// import 'lib-flexible'
// import Vue from 'vue'
// import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import address from '@/components/address'
import VeeValidate, {Validator} from 'vee-validate';
import cn from 'vee-validate/dist/locale/zh_CN';
import VueAwesomeSwiper from 'vue-awesome-swiper'
require('swiper/dist/css/swiper.css')

Validator.localize('cn', cn);
Vue.config.productionTip = false
Vue.use(VueRouter);
Vue.use(VeeValidate);
Vue.use(VueAwesomeSwiper)

const router = new VueRouter({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
     path: '/address',
      name: 'address',
      component: address

    }
  ]

})
new Vue({
  render: h => h(App),
  router,
}).$mount('#app')
