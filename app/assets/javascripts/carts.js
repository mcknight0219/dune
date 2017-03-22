import store from 'store/cart'

var app = new Vue({
    el: '#carts_app',
    store,
    computed: {
        // Cart error
        status() {
            return this.$store.getters.checkoutStatus
        },

        cart() {
          return this.$store.getters.cart
        }
    },

    methods: {
        updateCart() {

        },

        removeFromCart(id) {
          this.$store.dispatch('removeProduct', id)
        }
    },

    created() {
      this.$store.dispatch('getCart')
    }
})
