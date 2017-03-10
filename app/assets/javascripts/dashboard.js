import OrderPanel from 'components/order';
import ProductPanel from 'components/product';
import store from 'store/dashboard';

// Components
const routes = [
    { path: '/', component: OrderPanel },
    { path: '/order', component: OrderPanel },
    { path: '/product', component: ProductPanel}
]

const router = new VueRouter({
    routes
})

var app = new Vue({
    el: '#app',
    router,
    store,
    components: {
        'order-panel': OrderPanel,
        'product-panel': ProductPanel
    }
});