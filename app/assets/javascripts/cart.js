import cart_client from 'cart_client';
import cart_error  from 'cart_error';

function Cart(client = cart_client) {
  this.client = client
  this.items = [];
  var self = this;
}

Cart.prototype.addItem = function(newItem) {
  fetch('/cart', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      items: [{ op: '+', product: newItem }]
    })
  }).then(function (response) {
    if response.status >= 200 && response.status < 300 {
      this.items.push(newItem);
    } else {
      cart_error.popupError(response.json().error);
    }
  }).catch(function(error) {
    cart_error.popupError(error);
  });
}

Cart.prototype.removeItem = function(item) {
  var idx = this.items.indexOf(item);
  if (idx >= 0) {
    fetch('/cart', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        items: [{ op: '-', product: item }]
      })
    })
    .then(function(response) {
      if response.status >= 200 && response.status < 300 {
        this.items.splice(idx, 1);
      } else {
        cart_error.popupError(response.json().error);
      }
    })
    .catch(function(error) {
      cart_error.popupError(error);
    });
  }
}

Cart.prototype.hasItem = function(item) {
  return !this.items.indexOf(item) < 0;
}

Cart.prototype.clear = function() {
  this.items.length = 0;
}

Cart.prototype.getCount = function() {
  return this.items.length;
}

export default Cart;
