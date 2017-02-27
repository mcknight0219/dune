
// Components
const OrderPanel = {
    template: '<div class="panel-title"><strong>Order Panel</strong></div>'
}

const ProductPanel = {
    template: '<h1>Product Panel</h1>'
}

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
    components: {
        'order-panel': OrderPanel,
        'product-panel': ProductPanel
    }
});