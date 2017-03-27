import * as types from 'store/mutation-types'
import addressModule from 'store/address'
import api from 'api'

const state = {
    fullCart: [],
    checkoutStatus: null,
}

export const mutations = {
    [types.RECEIVE_CARTS] (state, { cart }) {
        state.fullCart = cart
    },

    [types.REMOVE_PRODUCT] (state, id) {
        state.checkoutStatus = null
        const record = state.fullCart.find(p => id === p.product.id)
        if (record) {
            state.fullCart.splice(state.fullCart.indexOf(record), 1)
            state.checkoutStatus = 'successful'
        } else {
            state.checkoutStatus = 'failed'
        }
    },

    [types.UPDATE_CART] (state, {id, q}) {
        state.checkoutStatus = null
        const record = state.fullCart.find(p => id === p.product.id)
        if (record) {
            record.quantity = q
            state.checkoutStatus = 'successful'
        } else {
            state.checkoutStatus = 'failed'
        }
    },

    [types.CART_SUCCESS] (state) {
        state.checkoutStatus = 'successful'
    },

    [types.CART_FAILED] (state, { savedCartItems }) {
        if (savedCartItems !== undefined)
            state.added = savedCartItems
        state.checkoutStatus = 'failed'
    }
}

export const actions = {
    getCart ({commit}) {
        api.getCart()
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                commit(types.RECEIVE_CARTS, data)
                commit(types.CART_SUCCESS)
            } else {
                commit(types.CART_FAILED, [])
            }
        })
    },

    removeProduct ({commit}, id) {
        api.removeProduct(id)
        .then(response => response.json())
        .then((data) => {
            if (data.success) {
                commit(types.REMOVE_PRODUCT, id)
                commit(types.CART_SUCCESS)
            } else {
                commit(types.CART_FAILED)
            }
        })

    },

    updateCart ({commit}, {id, q}) {
        debugger
        api.updateCart(id, q)
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    commit(types.UPDATE_CART, { id, q })
                    commit(types.CART_SUCCESS)
                } else {
                    commit(types.CART_FAILED)
                }
            })
    },

    addToCart({commit}, {id, quantity}) {
        debugger
        const record = state.fullCart.find(o => o.product.id === id)
        const q = record ? record.quantity + quantity : quantity
        api.updateCart(id, q)
          .then(response => response.json())
          .then(data => {
            if (data.success) {
              commit(types.UPDATE_CART, { id, q })
              commit(types.CART_SUCCESS)
            } else {
              commit(types.CART_FAILED)
            }
          })
    }
}

const cartModule = {
    state,
    mutations,
    actions,
    getters: {
        checkoutStatus: state => state.checkoutStatus,
        cart: state => state.fullCart
    }
}


export default new Vuex.Store({
    modules: {
        cart: cartModule,
        address: addressModule
    }
})
