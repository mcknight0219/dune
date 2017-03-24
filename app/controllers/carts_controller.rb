require 'exceptions'

class CartsController < ApplicationController
  before_action :authenticate_user!

  def show
    @cart = get_cart.full_form
    respond_to do |format|
      format.json { render :json => { :success => true, :cart => @cart } }
      format.html {
        if request.variant == :mobile
          render :template => 'carts/show.mobile'
        else
          render :template => 'carts/show'
        end
      }
    end
  end

  def update
    cart = get_cart
    begin
      cart_params.each do |item|
        raise ::Exception::CartError if item[:quantity].to_i < 0
        cart.update(item)
      end
      # save it to session
      session[:cart] = cart.items
      render :json => { success: true }
    rescue ::Exceptions::CartError
      render :json => { error: 'could not update cart', success: false }, :status => 500
    end
  end

  private

  def get_cart
    return Cart.new(session.key?('cart') ? session['cart'] : [])
  end

  def cart_params
    params.require(:cart)
  end
end
