import OrderPanel from 'components/dashboard/order';
import ProductPanel from 'components/dashboard/product';
import PackagePanel from 'components/dashboard/package';
import store from 'store/dashboard';

// Components
const routes = [
    {path: '/', component: PackagePanel},
    { path: '/order', component: OrderPanel },
    { path: '/product', component: ProductPanel},
    { path: '/package', component: PackagePanel}
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
        'product-panel': ProductPanel,
        'package-panel': PackagePanel
    }
});
