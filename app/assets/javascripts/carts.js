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
        productUrl(p) {
            return "/products/" + p.id
        },

        updateCart(id, quantity) {
            $this.strore.dispatch('updateCart', id, quantity)    
        },

        removeFromCart(id) {
          this.$store.dispatch('removeProduct', id)
        }
    },

    watch: {
        cart: {
            deep: true,
            // detect change in quantity
            handler: function(val, oldVal) {
            }
        }
    },

    created() {
      this.$store.dispatch('getCart')
    }
})
