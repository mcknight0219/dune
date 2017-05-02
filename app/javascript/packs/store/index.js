import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import mutations from './mutations'
import getters from './getters'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        orders: [],
        updateOrderStatus: null,
        addresses: [],
        packages: [],
        updatingPackage: null,
        products: [],
        productCategories: []
    },
    
    mutations,
    getters,
    actions
})