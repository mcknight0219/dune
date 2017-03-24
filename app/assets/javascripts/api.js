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


    getPackages: () => {
        return fetch('/packages', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest',
                'X-CSRF-Token': util.csrfToken()
            },
            credentials: 'same-origin'
        })
    },

    updatePackage: (pac) => {
        return fetch('/packages/' + pac.id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest',
                'X-CSRF-Token': util.csrfToken()
            },
            body: JSON.stringify({'package': { is_shipped: pac.is_shipped, is_received: pac.is_received}}),
            credentials: 'same-origin'
        })
    },

    getAddresses: () => {
        return fetch('/addresses', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest',
                'X-CSRF-Token': util.csrfToken()
            },
            credentials: 'same-origin'
        })
    },

    deleteAddress: (id) => {
        debugger
        return fetch('/addresses/' + id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest',
                'X-CSRF-Token': util.csrfToken()
            },
            credentials: 'same-origin'
        })
    },

    getProducts: () => {
        return fetch('/products', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest',
                'X-CSRF-Token': util.csrfToken()
            },
            credentials: 'same-origin'
        })
    },

    newProduct: (data) => {
        return fetch('/products', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest',
                'X-CSRF-Token': util.csrfToken()
            },
            body: JSON.stringify({product: data}),
            credentials: 'same-origin'
        })
    },

    deleteProduct: (id) => {
        return fetch('/products/' + id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMlHttpRequest',
                'X-CSRF-Token': util.csrfToken()
            },
            credentials: 'same-origin'
        })
    },

    updateProduct: (id, data) => {
        return fetch('/products/' + id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'X-Request-With': 'XMLHttpRequest',
                'X-CSRF-Token': util.csrfToken()
            },
            body: JSON.stringify({product: data}),
            credentials: 'same-origin'
        })
    },

    getOrders() {
        return fetch('/orders', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMlHttpRequest',
                'X-CSRF-Token': util.csrfToken()
            },
            credentials: 'same-origin'
        })
    },

    shipOrder(id) {
        return fetch('/orders/' + id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest',
                'X-CSRF-Token': util.csrfToken()
            },
            credentials: 'same-origin'
        })
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
