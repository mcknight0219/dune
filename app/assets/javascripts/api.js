import util from 'utils'

export default {
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

    newPackage: (pack) => {
        return fetch('/packages', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest',
                'X-CSRF-Token': util.csrfToken()
            },
            credentials: 'same-origin',
            body: JSON.stringify({package: pack})
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
                'X-Requested-With': 'XMlHttpRequest',
                'X-CSRF-Token': util.csrfToken()
            },
            credentials: 'same-origin'
        })
    },

    addCart: (product) => {
        return fetch('/cart', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                items: [{op: '+', product: product}]
            })
        })
    },

    delCart: (product) => {
        return fetch('/cart', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                items: [{op: '-', product: product}]
            })
        })
    }
};
