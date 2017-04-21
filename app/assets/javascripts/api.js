import util from 'utils'
import 'whatwg-fetch'

export default {
    csrf_fetch: (method, path, body) => {
      return fetch(path, {
        method: method,
        headers: {
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest',
                'X-CSRF-Token': util.csrfToken()
        },
        credentials: 'same-origin',
        body: body
      })
    },


    getPackages: function () {
        return this.csrf_fetch('GET', '/packages')
    },

    updatePackage: function (pac) {
        return this.csrf_fetch('PUT', '/packages/' + pac.id, JSON.stringify(
            {
                'package': {
                    is_shipped: pac.status === 'shipped',
                    is_received: pac.status === 'received'
                }
            }))
    },

    getAddresses: function () {
        return this.csrf_fetch('GET', '/addresses')
    },

    deleteAddress: function (id) {
        return this.csrf_fetch('DELETE', '/addresses/' + id)
    },

    getProducts: function () {
        return this.csrf_fetch('GET', '/products')
    },

    getProductCategories: function () {
        return this.csrf_fetch('GET', '/product_categories')
    },

    getItemCategories: function () {
        return this.csrf_fetch('GET', '/item_categories')
    },

    deleteItemCategory: function(id) {
        return this.csrf_fetch('DELETE', '/item_categories/' + id)
    },

    addProductCategory: function(data) {
        if (data.parentId === -1)
            data.parent_id = null
        else
            data.parent_id = data.parentId

        return this.csrf_fetch('POST', '/product_categories', JSON.stringify({product_category: data}))
    },

    addItemCategory: function(data) {
        return this.csrf_fetch('POST', '/item_categories', JSON.stringify({item_category: data}))  
    },

    newProduct: function (form) {
        return fetch('/products', {
            method: 'POST',
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
                'X-CSRF-Token': util.csrfToken()
            },
            credentials: 'same-origin',
            body: form
        })
    },

    deleteProduct: function (id) {
        return this.csrf_fetch('DELETE', '/products/' + id)
    },

    updateProduct: function (id, data) {
        return this.csrf_fetch('PUT', '/products/' + id, JSON.stringify({product: data}))
    },

    getOrders() {
        return this.csrf_fetch('GET', '/orders')
    },

    shipOrder(id) {
        return this.csrf_fetch('PUT', '/orders/' + id)
    },

    // Totally removes product from cart
    removeProduct: function (id) {
      return this.csrf_fetch('PUT', '/cart', JSON.stringify({
        cart: [{id: id, quantity: 0}]
      }))
    },

    updateCart: function(id, newQuantity) {
      return this.csrf_fetch('PUT', '/cart', JSON.stringify({
        cart:[{id: id, quantity: newQuantity}]
      }))
    },

    getCart: function() {
      return this.csrf_fetch('GET', '/cart')
    }
};
