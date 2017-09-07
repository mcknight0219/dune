import Vue from 'vue'
import VueRouter from 'vue-router'
import Order from '../components/order'
import ManageProduct from '../components/ManageProduct'
import Carousel from '../components/carousel'
import Wish from '../components/wish'
import Home from '../components/home'

Vue.use(VueRouter)

const routes = [
    { path: '/', component: Home },
    { path: '/home',  name: 'home',  component: Home },
    { path: '/order', name: 'order', component: Order },
    { path: '/manage-product', name: 'manage-product', component: ManageProduct },
    { path: '/carousel', name: 'carousel', component: Carousel },
    { path: '/wish', name: 'wish', component: Wish }
]

export default new VueRouter({routes})