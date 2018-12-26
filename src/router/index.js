import Vue from 'vue'
import Router from 'vue-router'
import Shop from '@/views/Shop'
import GoodsDetail from '@/views/GoodsDetail'
import PayCart from '@/views/PayCart'
import CheckOut from '@/views/CheckOut'
Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [
    {
      path: '/',
      name: 'Shop',
      component: Shop
    },
    {
    	path:'/detail',
    	name:'GoodsDetail',
    	component:GoodsDetail
    },
    {
    	path:'/paycart',
    	name:'PayCart',
    	component:PayCart
    },
    {
    	path:'/checkout',
    	name:'CheckOut',
    	component:CheckOut
    }
  ]
})
