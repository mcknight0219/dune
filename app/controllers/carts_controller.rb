class CartsController < ApplicationController
  respond_to :json
  skip_before_action :verify_authenticity_token

  # 注册用户或游客都可以有购物车。 游客在Checkout是会被引导到注册
  def show
    render :json => get_cart
  end
  
  def update
    cart = get_cart
    params[:cart_items].forEach do |it|
      cart.apply(it)
    end
  end

  private

  def get_cart
    session['cart'] ||= Cart.new
    return session['cart']
  end
end
