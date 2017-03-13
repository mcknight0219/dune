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

        RECEIVE_ADDRESSES: (state, {addresses}) => {
            state.addresses = addresses
        },

        DELETE_ADDRESS: (state, address) => {
            const record = state.addresses.find(o => o.id === address.id)
            state.addresses.splice(state.addresses.indexOf(record), 1)
        }
    },

    actions: {
        getAllAddresses({commit}) {
            api.getAddresses()
                .then(response => {
                    return response.json()
                })
                .then(({addresses}) => {
                    commit('RECEIVE_ADDRESSES', {addresses})
                })
        },

        deleteAddress({commit}, addr) {
           api.deleteAddress(addr.id)
               .then(response => response.json())
               .then(() => {
                   commit('DELETE_ADDRESS', addr)
               })
        }
    },

    getters: {
        allPackageItems: state => state.packageItems,
        allAddresses: state => state.addresses
    }
});
