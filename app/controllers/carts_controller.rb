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
      render :json => { error: '无法更新购物车。请稍后重试', success: false }, :status => 500
    end
  end

  # 创建订单， 并转到付款页面
  def create
    begin
      order = get_cart.generate_order(current_user, Address.find(params[:address_id]))
      session[:order_id] = order.id
      redirect_to payments_path
    rescue Exceptions::CartError
      flash[:error] = "无法创建订单。请稍后重试"
      render action: :show
    end
  end

  private

  def get_cart
    return Cart.new(session.key?(:cart) ? session[:cart] : [])
  end

  def cart_params
    params.require(:cart)
  end
end
