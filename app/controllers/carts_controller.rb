require 'exceptions'

class CartsController < ApplicationController
  respond_to :json

  def show
    render :json => get_cart
  end

  def update
    byebug
    cart = get_cart
    begin
      params[:items].each do |it|
        cart.apply(it)
      end
      head :ok
    rescue ::Exceptions::CartError
      render :json => {error: 'could not update cart'}, :status => 500
    end
  end

  private

  def get_cart
    if session['cart'].nil?
      new_cart = Cart.new
      session['cart'] = new_cart
      return new_cart
    else
      return Cart.new(session['cart']['items'])
    end
  end
end
