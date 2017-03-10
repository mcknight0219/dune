import api from 'api'

var store = new Vuex.Store({
    state: {
        packageItems: [],
        updateSuccess: null
    },

    mutations: {
        ADD_ITEM: (state, item) => {
            const record = state.packageItems.find(o => o.name === item.name && o.country === item.country && o.price === item.price)
            if (record) {
                record.quantity++
            } else {
                state.packageItems.push(item)
            }
        },

        UPDATE_SUCCESS: (state) => {
            state.updateSuccess = true
        },

        UPDATE_FAIL: (state) => {
            state.updateSuccess = false
        }
    },

    getters: {
        allPackageItems: state => state.packageItems
    }
});

var app = new Vue({
    el: '#app',

    store,

    computed: {
        packageItems() {
            return this.$store.getters.allPackageItems
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
    }
});
