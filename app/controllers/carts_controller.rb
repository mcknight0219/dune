class CartsController < ApplicationController
  respond_to :json
  skip_before_action :verify_authenticity_token

  # 注册用户或游客都可以有购物车。 游客在Checkout是会被引导到注册
  def show
    render :json => get_cart
  end
  
  def update
    cart = get_cart
    cart_original = cart
    begin
      params[:cart_items].each do |it|
        cart.apply(it)
      end
      head :ok
    rescue Exceptions::CartError
      render :json => {error: 'could not update cart', items: cart_original}, :status => 500
    end
  end

  private

  def get_cart
    session['cart'] ||= Cart.new
    return session['cart']
  end
end
