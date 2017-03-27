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

    data: {
        selected: {}
    },

    methods: {
        firstOne(index) {
            return index % 4 === 0
        },

        addCart (productId) {
            let quan = 0;
            Object.getOwnPropertyNames(this.selected).forEach((name) => {
                if (parseInt(name) === productId) {
                    quan = parseInt(this.selected[name])
                }
            })

            this.$store.dispatch('addToCart', {id: productId, quantity: quan})
        }
    },

    created () {
        this.$store.dispatch('getCart')
    }
})
