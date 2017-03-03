
export default {
    getProducts: () => {
        return fetch('/products', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
    },

    getOrders() {
        return fetch('/orders', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
    },

    shipOrder(id) {
        return fetch(`/orders/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            }
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