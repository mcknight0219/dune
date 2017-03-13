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
            package: {},
            selectedAddress: null,

            needPickup: false,
            pickupAddress: null
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
            alert('提交表单')
        }
    },

    created() {
        this.$store.dispatch('getAllAddresses')
    },

    components: {
        'address-label': Address
    }
});
