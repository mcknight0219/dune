
export default {
    getProducts: () => {
        fetch('/products', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
    },

    getOrders() {
        fetch('/orders', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
    },

    addCart: (product) => {
        fetch('/cart', {
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
        fetch('/cart', {
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