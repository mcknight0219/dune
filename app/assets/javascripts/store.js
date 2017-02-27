import * as types from 'mutation-types'
import api from 'api'

const jsonResponse = (response) => {
    return response.json()
};

const state = {
    // shopping cart
    products: [],
    added: [],
    checkoutStatus: null,
    // admin dashboard
    orders: []
}

export const mutations = {
    [types.RECEIVE_PRODUCTS] (state, { products }) {
        state.products = products
    },

    [types.RECEIVE_ORDERS] (state, { orders }) {
        state.orders =  orders
    },

    [types.ADD_TO_CART] (state, { id }) {
        state.checkoutStatus = null
        const record = state.added.find(p => p.id === id)
        if (!record) {
            state.added.push({
                id: id,
                quantity: 1
            })
        } else {
            record.quantity++
        }
    },

    [types.DEL_FROM_CART] (state, { id }) {
        state.checkoutStatus = null
        const record = state.added.find(p => p.id === id)
        record.quantity--
    },

    [types.CART_SUCCESS] (state) {
        state.checkoutStatus = 'successful'
    },

    [types.CART_FAILED] (state, { savedCartItems }) {
        state.added = savedCartItems
        state.checkoutStatus = 'failed'
    }
}

export const actions = {
    getAllProducts ({commit}) {
        api.getProducts()
            .then((response) => {
                return response.json()
            })
            .then(({ products }) => {
                commit(types.RECEIVE_PRODUCTS, { products })
            })
    },

    getAllOrders ({commit}) {
        api.getOrders()
    },

    addToCart ({commit}, { id }) {
        const saved = [...state.added]
        api.addCart(id)
            .then(jsonResponse)
            .then(data => {
                if (data.success) {
                    commit(types.ADD_TO_CART, { id })
                    commit(types.CART_SUCCESS)
                } else {
                    commit(types.CART_FAILED, { saved })
                }
            })
    },

    delFromCart ({commit}, { id }) {
        const saved = [...state.added]
        api.delCart(id)
            .then(jsonResponse)
            .then(data => {
                if (data.success) {
                    commit(types.DEL_FROM_CART, { id })
                    commit(types.CART_SUCCESS)
                } else {
                    commit(types.CART_FAILED, { saved })
                }
            })
    }
}

export default new Vuex.Store({
    state,
    mutations,
    actions,

    getters: {
        checkoutStatus: state => state.checkoutStatus,
        allProducts: state => state.products
    },
})
