import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import mutations from './mutations'
import getters from './getters'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        isMobile: false,
        sidebar: true,
        orders: [],
        updateOrderStatus: null,
        addresses: [],
        packages: [],
        updatingPackage: null,
        products: [],
        productCategories: [],
        shipOrderStatus: 'normal'
    },
    
    mutations,
    getters,
    actions
})