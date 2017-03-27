import store from 'store/cart'
import Address from 'components/address'

var app = new Vue({
    el: '#carts_app',
    store,
    computed: {
        // Cart error
        status() {
            return this.$store.getters.checkoutStatus
        },

        cart () {
            return this.$store.getters.cart
        },

        addresses () {
            return this.$store.getters.addresses
        },

        disableSubmit() {
            return Object.keys(this.selectedAddress).length === 0
        }
    },

    methods: {
        productUrl(p) {
            return "/products/" + p.id
        },

        updateCart(id, q) {
            $this.store.dispatch('updateCart', { id, q })
        },

        removeFromCart(id) {
          this.$store.dispatch('removeProduct', id)
        },

        updateQuantity(id, event) {
            const q = parseInt(event.target.value)
            this.$store.dispatch('updateCart', { id, q })
        },

        removeAddress(addr) {
            this.$store.dispatch('deleteAddress', addr)
        },

        selectAddress(addr) {
            this.selectedAddress = addr
        },

        searchAddress(query) {
            if (query === undefined || query === '' || query === {}) {
                return []
            }

            const terms = query.split(/[, ]+/)
            // `found` contains array of array of searching results for each term
            const found = terms.map((t) => {
                var res = [];
                // Addresses is empty at this poin
                this.$store.getters.allAddresses.forEach((addr) => {
                    const target = Object.getOwnPropertyNames(addr).reduce((acc, k) => acc + addr[k] + ' ', '')
                    if (target.indexOf(t) >= 0) {
                        res.push(addr)
                    }
                })
                return res
            })

            return utils.unique([].concat(...found))
        }
    },

    data() {
        return {
            selectedAddress: {},
            query: '',
            inSearch: false,
            searchResult: []
        }
    },

    created () {
        this.$store.dispatch('getCart')
        this.$store.dispatch('getAllAddresses')
    },

    components: {
        'address-label': Address
    }
})
