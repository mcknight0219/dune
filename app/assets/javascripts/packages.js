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
            note: ''
        }
    },

    methods: {
        addPackageItem() {
            this.$store.commit('ADD_ITEM', this.packageItem)
            this.packageItem = {}
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

          debugger
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
        }
    },

    created() {
        this.$store.dispatch('getAllAddresses')
    },

    components: {
        'address-label': Address
    }
});
