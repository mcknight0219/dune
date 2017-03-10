import * as types from 'store/mutation-types'
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
    orders: [],
    updateOrderStatus: null,

    addresses: []
}

export const mutations = {
    [types.RECEIVE_PRODUCTS] (state, { products }) {
        state.products = products
    },

    [types.ADD_NEW_PRODUCT] (state, {product}) {
        state.products.push(product)
    },

    [types.DELETE_PRODUCT] (state, {product}) {
        const record = state.products.find(p => p.id === product.id)
        if (record) {
            state.products.splice(state.products.indexOf(record), 1)
        }
    },

    [types.UPDATE_PRODUCT] (state, {product}) {
        const record = state.products.find(p => p.sku === product.sku)
        if (!record) {
            state.products.push(record)
        } else {
            Object.keys(record).map((k, i) => {
                record[k] = product[k]
            })
        }
    },

    [types.RECEIVE_ORDERS] (state, { orders }) {
        state.orders =  orders
    },

    [types.MARK_ORDER_SHIPPED] (state, {id}) {
        const order = state.orders.find(o => o.id == id)
        order.is_shipped = true
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
    },

    [types.RECEIVE_ADDRESSES] (state, {addresses}) {
        state.addresses = addresses
    }
}

export const actions = {
    getAllAddresses ({commit}) {
        api.getAddresses()
            .then(jsonResponse)
            .then(({addresses}) => {
                commit(types.RECEIVE_ADDRESSES, {addresses})
            })
    },

    getAllProducts ({commit}) {
        api.getProducts()
            .then((response) => {
                return response.json()
            })
            .then(({ products }) => {
                commit(types.RECEIVE_PRODUCTS, { products })
            })
    },

    addNewProduct ({commit}, {product}) {
        api.newProduct(product)
            .then(jsonResponse)
            .then(({product}) => {
                commit(types.ADD_NEW_PRODUCT, {product})
            })
    },

    deleteProduct ({commit}, {product}) {
        api.deleteProduct(product.id)
            .then(jsonResponse)
            .then(() => {
                commit(types.DELETE_PRODUCT, {product})
            })
    },

    getAllOrders ({commit}) {
        api.getOrders()
            .then(jsonResponse)
            .then(({orders}) => {
                commit(types.RECEIVE_ORDERS, {orders})
            })
    },

    shipOrder ({commit}, {id}) {
        api.shipOrder(id)
            .then(jsonResponse)
            .then(() => {
                commit(types.MARK_ORDER_SHIPPED, {id})
            })
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
        allProducts: state => state.products,
        allOrders: state => state.orders,
        allAddresses: state => state.addresses
    },
})
