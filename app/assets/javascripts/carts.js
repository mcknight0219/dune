import store from 'store/cart'

var app = new Vue({
    el: '#carts_app',
    store,
    computed: {
        // Cart error
        status() {
            return this.$store.getters.checkoutStatus
        }
    },

    methods: {
        updateCart() {

        },

        removeFromCart() {
            this.$store.dispatch
        }
    }
})
