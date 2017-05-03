import Api from '../api'

function jsonResponse(response) {
    return response.json()
}

export default {
     getAllAddresses: ({commit}) => {
        Api.getAddresses()
            .then(jsonResponse)
            .then(({addresses}) => {
                commit('RECEIVE_ADDRESSES', {addresses})
            })
    },

    getAllProducts: ({commit}) => {
        Api.getProducts()
            .then((response) => {
                return response.json()
            })
            .then(({ products }) => {
                commit('RECEIVE_PRODUCTS', { products })
            })
    },

    getAllProductCategories: ({commit}) => {
        Api.getProductCategories()
            .then((response) => {
                return response.json()
            })
            .then((data) => {
                commit('RECEIVE_PRODUCT_CATEGORIES', data)
            })
    },

    addProductCategory: ({commit}, { category }) => {
        Api.addProductCategory(category)
            .then((response) => {
                return response.json()
            })
            .then((data) => {
                commit('ADD_PRODUCT_CATEGORY', data.productCategory)
            })
    },

    getAllPackages: ({commit}) => {
        Api.getPackages()
            .then(response => response.json())
            .then(({packages}) => {
                commit('RECEIVE_PACKAGES', { packages })
            })
    },

    updatePackage: ({commit}, pac) => {
        commit('START_PACKAGE_UPDATING', pac.id)
        Api.updatePackage(pac)
            .then(response => response.json())
            .then(() => {
                commit('UPDATE_PACKAGE', { pac })
                commit('STOP_PACKAGE_UPDATING')
            })
    },

    addNewProduct: ({commit}, {product}) => {
        Api.newProduct(product)
            .then(jsonResponse)
            .then(({product}) => {
                commit('ADD_NEW_PRODUCT', {product})
            })
    },

    deleteProduct: ({commit}, {product}) => {
        Api.deleteProduct(product.id)
            .then(jsonResponse)
            .then(() => {
                commit('DELETE_PRODUCT', {product})
            })
    },

    getAllOrders: ({commit}) => {
        Api.getOrders()
            .then(jsonResponse)
            .then(({orders}) => {
                commit('RECEIVE_ORDERS', {orders})
            })
    },

    shipOrder: ({commit}, {id}) => {
        Api.shipOrder(id)
            .then(jsonResponse)
            .then(() => {
                commit('MARK_ORDER_SHIPPED', {id})
            })
    }
}