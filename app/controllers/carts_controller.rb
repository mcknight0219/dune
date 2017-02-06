class CartsController < ApplicationController
  respond_to :json
  skip_before_action :verify_authenticity_token

  # 注册用户或游客都可以有购物车。 游客在Checkout是会被引导到注册
  def show
    cart = session['cart'] || Cart.new
    render cart
  end
  
  def update
    
  end
end
