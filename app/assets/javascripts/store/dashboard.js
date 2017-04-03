import * as types from 'store/mutation-types'
import api from 'api'

const jsonResponse = (response) => {
    return response.json()
};

const state = {
    orders: [],
    updateOrderStatus: null,
    addresses: [],
    packages: [],
    products: [],
    productCategories: [],
    itemCategories: []
}

export const mutations = {
    [types.RECEIVE_PRODUCTS] (state, { products }) {
        state.products = products
    },

    [types.RECEIVE_PRODUCT_CATEGORIES] (state, categories) {
        state.productCategories = categories
    },

    [types.RECEIVE_ITEM_CATEGORIES] (state, categories) {
        state.itemCategories = categories
    },

    [types.ADD_PRODUCT_CATEGORY] (state, category) {
        state.productCategories.push(category)
    },

    [types.ADD_ITEM_CATEGORY] (state, category) {
        state.itemCategories.push(category)
    },

    [types.DELETE_ITEM_CATEGORY] (state, id) {
        const record = state.itemCategories.find(o => o.id === id)
        if (record) {
            state.itemCategories.splice(state.itemCategories.indexOf(record), 1)
        }
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
    
    [types.RECEIVE_ADDRESSES] (state, {addresses}) {
        state.addresses = addresses
    },

    [types.RECEIVE_PACKAGES] (state, {packages}) {
        state.packages = packages
    },

    [types.UPDATE_PACKAGE] (state, { pac }) {
        const record = state.packages.find(p => p.id === pac.id)
        if (record) {
            record.is_shipped = pac.is_shipped
            record.is_received = pac.is_received
        }
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

    getAllProductCategories({commit}) {
        api.getProductCategories()
            .then((response) => {
                return response.json()
            })
            .then((data) => {
                commit(types.RECEIVE_PRODUCT_CATEGORIES, data)
            })
    },

    getAllItemCategories({commit}) {
        api.getItemCategories()
            .then((response) => response.json())
            .then((data) => {
                commit(types.RECEIVE_ITEM_CATEGORIES, data)
            })
    },

    addProductCategory({commit}, { category }) {
        api.addProductCategory(category)
            .then((response) => {
                return response.json()
            })
            .then((data) => {
                commit(types.ADD_PRODUCT_CATEGORY, data.productCategory)
            })
    },

    addItemCategory({commit}, { category }) {
        api.addItemCategory(category)
          .then((response) => response.json())
          .then((data) => {
            commit(types.ADD_ITEM_CATEGORY, data.itemCategory)
          })
    },

    deleteItemCategory({commit}, id) {
        api.deleteItemCategory(id)
            .then((response) => response.json())
            .then(() => {
                commit(types.DELETE_ITEM_CATEGORY, id)
            })
    },

    getAllPackages ({commit}) {
        api.getPackages()
            .then(response => response.json())
            .then(({packages}) => {
                commit(types.RECEIVE_PACKAGES, { packages })
            })
    },

    updatePackage ({commit}, pac) {
        api.updatePackage(pac)
            .then(response => response.json())
            .then(() => {
                commit(types.UPDATE_PACKAGE, { pac })
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
    }
}

export default new Vuex.Store({
    state,
    mutations,
    actions,

    getters: {
        allProducts: state => state.products,
        allProductCategories: state => state.productCategories,
        allItemCategories: state => state.itemCategories,
        allOrders: state => state.orders,
        allAddresses: state => state.addresses,
        allPackages: state => state.packages
    },
})
