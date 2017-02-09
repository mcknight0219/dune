import cart_client from 'cart_client'

function Cart(client = cart_client) {
  this.client = client
  this.items = [];
  var self = this;
  // bind to items
  Object.defineProperty(this.items, "push", {
    configurable: false,
    enumerable: false,
    writable: false,
    value: function () {
      self.client.addToCart();
      return Array.prototype.push.apply(this, arguments);
    }
  });
  
  Object.defineProperty(this.items, "splice", {
    configurable: false,
    enumerable: false,
    writable: false,
    value: function() {
      self.client.delFromCart();
      return Array.prototype.splice.apply(this, arguments);
    }
  });
}

Cart.prototype.addItem = function(newItem) {
  this.items.push(newItem);
  return this.items.length;
}

Cart.prototype.removeItem = function(item) {
  var idx = this.items.indexOf(item);
  if (idx >= 0) {
    var removed = this.items.splice(idx, 1);
    return removed.length == 1 ? removed[0] : null;
  }

  return null;
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
