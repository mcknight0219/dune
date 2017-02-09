import Cart from "cart";
import cart_client from 'cart_client';

describe("Cart", () => {
  var cart;
  
  beforeEach(() => {
    spyOn(cart_client, 'addToCart');
    spyOn(cart_client, 'delFromCart');
    
    cart = new Cart();
  });

  it("adds items", () => {
    cart.addItem("item1");
    expect(cart.getCount()).toEqual(1);
    expect(cart_client.addToCart).toHaveBeenCalled();
  });
  
  it("removes items", () => {
    cart.addItem("item1");
    let item = cart.removeItem("item1");
    expect(cart_client.delFromCart).toHaveBeenCalled();
    expect(cart.getCount()).toEqual(0);
    expect(item).toEqual("item1");
  })
});
