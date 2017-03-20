import * as types from 'store/mutation-types'
import api from 'api'

const state = {
  products: [],
  added: [],
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

  [types.CART_SUCCESS] (state) {
    state.checkoutStatus = 'successful'
  },

  [types.CART_FAILED] (state, { savedCartItems }) {
    state.added = savedCartItems
    state.checkoutStatus = 'failed'
  }
}

export const actions = {
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
  }
})
