import utils from 'utils'
import store from 'store/packages'
import Address from 'components/address'

export const methods = {
    addPackageItem() {
        this.$store.commit('ADD_ITEM', this.packageItem)
        this.packageItem = {}
    },

    removePackageItem(item) {
        this.$store.commit('DEL_ITEM', item)
    },

    submit() {
        api.newPackage().then(response => {
            this.$store.commit('UPDATE_SUCCESS')
        })
    },

    removeAddress(addr) {
        this.$store.dispatch('deleteAddress', addr)
    },

    selectAddress(addr) {
        this.selectedAddress = addr
    },

    submitPackage() {
        const params = {
            package: {
                address_id: this.selectedAddress.id,
                package_items: this.packageItems,
                pickup: this.needPickup,
                pickup_address: this.pickupAddress,
                note: this.note
            }
        }

        fetch('/packages', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Request-With': 'XMLHttpRequest',
                'X-CSRF-Token': utils.csrfToken()
            },
            body: JSON.stringify(params),
            credentials: 'same-origin'
        })
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
}

var app = new Vue({
    el: '#app',
    store,
    computed: {
        packageItems() {
            return this.$store.getters.allPackageItems
        },

        addresses: {
            get: function () {
                if (!this.inSearch) {
                    return this.$store.getters.allAddresses
                } else {
                    return this.searchResult
                }
            },

            set: function (addrs) {
                this.searchResult = addrs
            }
        }
    },

    data() {
        return {
            packageItem: {},
            selectedAddress: null,
            needPickup: false,
            pickupAddress: null,
            note: '',
            query: '',
            inSearch: false,
            searchResult: []
        }
    },

    watch: {
        // trigger search after at least 3 characters are typed
        query(str) {
            if (str === undefined || typeof str !== 'string') {
                return
            }
            this.inSearch = true
            if (str.length >= 3) {
                this.searchResult = this.searchAddress(str)
            }
            if (str.length === 0) {
                this.inSearch = false
            }
        }
    },

    methods,

    created() {
        this.$store.dispatch('getAllAddresses')
    },

    components: {
        'address-label': Address
    }
});
