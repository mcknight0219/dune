import store from 'store/cart'

var app = new Vue({
  el: '#app',
  store,
  computed: {
    // Cart error
    status() {
      return this.$store.getters.checkoutStatus
    }
  },

  methods: {
    firstOne(index) {
      return index % 4 === 0
    },

    addCart(productId) {
      debugger
      this.$store.dispatch('addToCart', {id: productId})
    }
  }
})
