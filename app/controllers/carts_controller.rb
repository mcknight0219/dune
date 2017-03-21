require 'exceptions'

class CartsController < ApplicationController
  before_action :authenticate_user!

  def show
    respond_to do |format|
      format.json { render :json => get_cart }
      format.html
    end
  end

  def update
    cart = get_cart
    begin
      params[:items].each do |it|
        cart.apply(it)
      end
      render :json => { success: true }
    rescue ::Exceptions::CartError
      render :json => { error: 'could not update cart', success: false }, :status => 500
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
