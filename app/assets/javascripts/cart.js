
function Cart() {
  this.items = [];
  // bind to items
  Object.defineProperty(this.items, "push", {
    configurable: false,
    enumerable: false,
    writable: false,
    value: function () {
      return Array.prototype.push.apply(this, arguments);
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

Cart.prototype.clear = function() {
  this.items.length = 0;
}

Cart.prototype.getCount = function() {
  return this.items.length;
}

export default Cart;
