import { csrfToken, unique, parseRange } from '../util'
import 'whatwg-fetch'

function csrf_fetch(method, path, body) {
    return fetch(path, {
        method: method,
        headers: {
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
            'X-CSRF-Token': csrfToken()
        },
        credentials: 'same-origin',
        body: body
    })
}

export default {
     download: function(dates, type) {
        var start, end
       
        [start, end] = parseRange(dates).map ((d) => d.toISOString().slice(0, 10))
        let url = '/packages.csv?start_date=' + start + "&end_date=" + end
        if (type === 'luxury') {
            url = url + '&luxury=true'
        }

        return fetch(url, {
            method: 'GET',
            headers: {
                'X-CSRF-Token': csrfToken()
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
        return csrf_fetch('GET', '/packages')
    },

    updatePackage: function (pac) {
        return csrf_fetch('PUT', '/packages/' + pac.id, JSON.stringify(
            {
                'package': {
                    is_shipped: pac.status === 'shipped',
                    is_received: pac.status === 'received'
                }
            }))
    },

    getAddresses: function () {
        return csrf_fetch('GET', '/addresses')
    },

    getUploads: function () {
        return csrf_fetch('GET', '/uploads')
    },

    deleteAddress: function (id) {
        return csrf_fetch('DELETE', '/addresses/' + id)
    },

    getProducts: function () {
        return csrf_fetch('GET', '/products')
    },

    getProductCategories: function () {
        return csrf_fetch('GET', '/product_categories')
    },

    getItemCategories: function () {
        return csrf_fetch('GET', '/item_categories')
    },

    deleteItemCategory: function(id) {
        return csrf_fetch('DELETE', '/item_categories/' + id)
    },

    addProductCategory: function(data) {
        if (data.parentId === -1) 
            data.parent_id = null
        else
            data.parent_id = data.parentId

        return csrf_fetch('POST', '/product_categories', JSON.stringify({product_category: data}))
    },

    deleteProductCategory: function(id) {
        return csrf_fetch('DELETE', '/product_categories/' + id)
    },

    addItemCategory: function(data) {
        return csrf_fetch('POST', '/item_categories', JSON.stringify({item_category: data}))  
    },

    newProduct: function (form) {
        return fetch('/products', {
            method: 'POST',
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
                'X-CSRF-Token': csrfToken()
            },
            credentials: 'same-origin',
            body: form
        })
    },

    updateInventory: function({id, stock}) {
        return csrf_fetch('PUT', '/inventories/' + id, JSON.stringify({ adjustment: stock}))
    },

    deleteProduct: function (id) {
        return csrf_fetch('DELETE', '/products/' + id)
    },

    updateProduct: function (id, data) {
        return csrf_fetch('PUT', '/products/' + id, JSON.stringify({product: data}))
    },

    getOrders() {
        return csrf_fetch('GET', '/orders')
    },

    shipOrder({id, trackingNumber}) {
        return csrf_fetch('PUT', '/orders/' + id, JSON.stringify({tracking_number: trackingNumber}))
    },

    // Totally removes product from cart
    removeProduct: function (id) {
      return csrf_fetch('PUT', '/cart', JSON.stringify({
        cart: [{id: id, quantity: 0}]
      }))
    },

    updateCart: function(id, newQuantity) {
      return csrf_fetch('PUT', '/cart', JSON.stringify({
        cart:[{id: id, quantity: newQuantity}]
      }))
    },

    getCart: function() {
      return csrf_fetch('GET', '/cart')
    }
}