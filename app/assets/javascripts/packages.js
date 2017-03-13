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
          const form = new FormData()
          form.append('pickup', this.needPickup)
          form.append('note', this.note)
          form.append('pick_address', this.pickupAddress)
          form.append('address', this.selectedAddress.id)
          form.append('package_items', this.packageItems)

          fetch('/packages', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Request-With': 'XMLHttpRequest',
                'X-CSRF-Token': util.csrfToken()
            },
            data: form,
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
