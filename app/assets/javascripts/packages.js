import store from 'store/packages';

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
            package: {}
        }
    },

    methods: {
        addPackageItem() {
            this.$store.commit('ADD_ITEM', this.packageItem)
        },

        submit() {
            api.newPackage().then(response => {
                this.$store.commit('UPDATE_SUCCESS')
            })
        }
    },

    created() {
        //this.$store.dispatch('getAllAddresses')
    }
});
