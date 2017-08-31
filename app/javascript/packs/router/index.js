import Vue from 'vue'
import VueRouter from 'vue-router'
import Order from '../components/order'
import ManageProduct from '../components/ManageProduct'
import Package from '../components/package'
import Upload from '../components/upload'
import Home from '../components/home'

Vue.use(VueRouter)

const routes = [
    { path: '/', component: Home },
    { path: '/home',  name: 'home',  component: Home },
    { path: '/order', name: 'order', component: Order },
    { path: '/manage-product', name: 'manage-product', component: ManageProduct },
    { path: '/upload', name: 'upload', component: Upload }
]

export default new VueRouter({routes})