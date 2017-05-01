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

    download: function(dates, type) {
        var start, end
        [start, end] = util.parseRange(dates)
        let url = '/packages.csv?start_date=' + start.toISOString().slice(0, 10) + "&end_date=" + end.toISOString().slice(0, 10)
        if (type === 'luxury') {
            url = url + '?luxury'
        }

        return fetch(url, {
            method: 'GET',
            headers: {
                'X-CSRF-Token': util.csrfToken()
            },
            credentials: 'same-origin'
        }).then(response => response.blob())
        .then((blob) => {
            var a = window.document.createElement("a")
            a.href = URL.createObjectURL(blob, {type: "text/plain"})
            let filename = ""
            if (type === "luxury") {
                filename = "轻奢-" + start + "-" + end + ".csv"
            } else {
                filename = "普货-" + start + "-" + end + ".csv"
            }
            a.download = filename
            document.body.appendChild(a)
            a.click()
            document.body.removeChild(a)
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
