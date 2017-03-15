import util from 'utils'
import store from 'store/packages'
import Address from 'components/address'

var app = new Vue({
    el: '#app',
    store,
    computed: {
        packageItems() {
            return this.$store.getters.allPackageItems
        },

        addresses() {
            return this.$store.getters.allAddresses
        }
    },

    data() {
        return {
            packageItem: {},
            selectedAddress: null,
            needPickup: false,
            pickupAddress: null,
            note: '',
            query: ''
        }
    },

    watch: {
      // trigger search after at least 3 characters are typed
      query(val) {
        if (val !== undefined && typeof val === 'string' && val.length >= 3) {
          searchAddress(val)
        }
      }
    },

    methods: {
        addPackageItem() {
            this.$store.commit('ADD_ITEM', this.packageItem)
            this.packageItem = {}
        },

        removePackageItem(item) {
            debugger
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
                'X-CSRF-Token': util.csrfToken()
            },
            body: JSON.stringify(params),
            credentials: 'same-origin'
          })
        },
        
        searchAddress(query) {
          const terms = query.split('/\W+/')
          // Make search on each term and merge results together
          const found = terms.map((t) => {
            var res = [];
            this.addresses.forEach((addr) => {
              const target = addr.name + addr.address_line1 + addr.address_line2 + addr.city + addr.state + addr.mobile + addr.phone + addr.post_code
              if (target.indexOf(t) >= 0) {
                res.append(t)
              }
            })
            return res
          }).reduce((accu, val) => {
            accu.append(val)
          }, [])

          return found
        }
    },

    created() {
        this.$store.dispatch('getAllAddresses')
    },

    components: {
        'address-label': Address
    }
});
