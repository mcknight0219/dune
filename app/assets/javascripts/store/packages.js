import api from 'api';

export default new Vuex.Store({
    state: {
        packageItems: [],
        addresses: [],
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
        },

        RECEIVE_ADDRESSES: (state, addresses) => {
            state.address = addresses
        }
    },

    actions: {
        getAllAddresses({commit}) {
            api.getAddresses()
                .then(response => JSON.parse(response))
                .then(({addresses}) => {
                    commit('RECEIVE_ADDRESSES', {addresses})
                })
        }
    },

    getters: {
        allPackageItems: state => state.packageItems,
        allAddresses: state => state.addresses
    }
});
