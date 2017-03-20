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

    categoryName (id) {
        return ['包','维生素','衣服', '其它'][parseInt(id)-1]
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
        },

        disableSubmit() {
            return Object.keys(this.selectedAddress).length === 0 || this.packageItems.length === 0
        }
    },

    data() {
        return {
            packageItem: {item_category_id: 1},
            selectedAddress: {},
            luxury: false,
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
