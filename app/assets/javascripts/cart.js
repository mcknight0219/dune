import cart_error  from 'cart_error';

function Cart() {
    this.items = [];
    var self = this;
}

Cart.prototype.addItem = function (newItem) {
    var self = this
    return fetch('/cart', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            items: [{op: '+', product: newItem}]
        })
    }).then(function (response) {
        if (response.status >= 200 && response.status < 300) {
            self.items.push(newItem);
        } else {
            cart_error.popupError(response.json().error);
        }
    }).catch(function (error) {
        cart_error.popupError(error);
    });
}

Cart.prototype.removeItem = function (item) {
    var self = this;
    var idx = this.items.indexOf(item);
    if (idx >= 0) {
        return fetch('/cart', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                items: [{op: '-', product: item}]
            })
        })
            .then(function (response) {
                if (response.status >= 200 && response.status < 300) {
                    self.items.splice(idx, 1);
                } else {
                    cart_error.popupError(response.json().error);
                }
            })
            .catch(function (error) {
                cart_error.popupError(error);
            });
    }
}

Cart.prototype.syncRemote = function () {
    "use strict";
    var self = this;
    return fetch('/cart', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(function (response) {
        if (response.status >= 200 && response.status < 300) {
            return response;
        } else {
            let err = new Error();
            err.response = response;
            throw error;
        }
    }).then(function (response) {
        return response.json();
    }).then(function (data) {
        self.items.length = 0;
        self.items = data["items"];
    }).catch(function (error) {
        cart_error.popupError('Could not get cart information. Please try again later');
    })
}

Cart.prototype.hasItem = function (item) {
    return !this.items.indexOf(item) < 0;
}

Cart.prototype.clear = function () {
    this.items.length = 0;
}

Cart.prototype.getCount = function () {
    return this.items.length;
}

export default Cart;
