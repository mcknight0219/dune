import client from 'cart_client'

describe('Cart client', () => {
  it('singleton', () => {
    expect(client).toBeDefined();
  });
});