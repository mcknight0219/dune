import Vue from 'vue'
import VueRouter from 'vue-router'
import Order from '../components/order'
import Product from '../components/product'
import Package from '../components/package'
import Home from '../components/home'

Vue.use(VueRouter)

const routes = [
    { path: '/', component: Home },
    { path: '/home', component: Home },
    { path: '/order', component: Order },
    { path: '/product', component: Product },
    { path: '/package', component: Package }
]

export default new VueRouter({routes})