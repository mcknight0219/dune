import * as types from 'store/mutation-types'
import api from 'api'

const state = {
  added: [],
  fullCart: [],
  checkoutStatus: null,
}

export const mutations = {
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
  
  addToCart ({commit}, { id }) {
    const saved = [...state.added]
    api.addCart(id)
    .then(response => response.json())
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
    .then(response => response.json())
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
      cart: state => state.fullCart
  }
})
