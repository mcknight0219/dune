import api from 'api';

export default {
    state: {
        addresses: [],
    },

    mutations: {
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
        addresses: state => state.addresses
    }
};
