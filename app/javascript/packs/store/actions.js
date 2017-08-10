import Api from '../api'

function jsonResponse(response) {
    return response.json()
}

export default {
    toggleDevice: ({commit}, isMobile) => {
        commit('TOGGLE_DEVICE', isMobile)
    },

    toggleSidebar: ({commit}, opened) => {
        commit('TOGGLE_SIDEBAR', opened)
    },
    
     getAllAddresses: ({commit}) => {
        Api.getAddresses()
            .then(jsonResponse)
            .then(({addresses}) => {
                commit('RECEIVE_ADDRESSES', {addresses})
            })
    },

    getAllUploads: ({commit}) => {
        Api.getUploads()
          .then(jsonResponse)
          .then((uploads) => {
              commit('RECEIVE_UPLOADS', {uploads})
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

    deleteProductCategory: ({commit}, id) => {
        Api.deleteProductCategory(id)
            .then((response) => {
                return response.json()
            })
            .then(({ success }) => {
                if (success) {
                    commit('DEL_PRODUCT_CATEGORY', id)
                }
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

    shipOrder: ({commit}, {id, trackingNumber}) => {
        Api.shipOrder({id, trackingNumber})
            .then(jsonResponse)
            .then(({success}) => {
                if (success) {
                    commit('SHIP_ORDER', {id, trackingNumber})
                    commit('MARK_SHIP_ORDER_STATUS', 'success')
                } else {
                    commit('MARK_SHIP_ORDER_STATUS', 'failure')
                }
            })
    },

    resetShipOrderStatus: ({commit}) => {
        commit('MARK_SHIP_ORDER_STATUS', 'normal')
    }
}