import Cart from "cart";

describe("Cart", () => {
  it("initialize with 0 item", () => {
    let cart = new Cart();
    expect(cart.getCount()).toEqual(0);
  });

  it("adds new item", () => {
    let cart = new Cart();
    cart.addItem("item1");
    expect(cart.getCount()).toEqual(1);
  });
});
