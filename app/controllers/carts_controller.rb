require 'exceptions'

class CartsController < ApplicationController
  before_action :authenticate_user!
  before_action :redirect_if_no_cart, :except => [:show]

  # Step 1. show cart items
  def show
    session[:in_cart] = true
    @cart = get_cart.full_form
    if request.variant == :mobile
      render :template => 'carts/show.mobile'
    else
      render :template => 'carts/show'
    end
  end

  def update
    cart = get_cart
    cart.update({:id => params[:id].to_i, :quantity => params[:quantity].to_i})
    session[:cart] = cart.items

    redirect_to :action => :show
  end

  def destroy
    cart = get_cart
    cart.delete(params[:id].to_i)
    session[:cart] = cart.items

    redirect_to :action => :show
  end

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

  def add_to_cart
    cart = get_cart
    cart.update({:id => params[:product].to_i, :quantity => 1})
    session[:cart] = cart.items
    redirect_to :action => :show
  end

  def choose_address
    @total = current_user.addresses.count
    @addresses = current_user.addresses.paginate(:page => params[:page], :per_page => 10)

    render 'carts/address'
  end

  def order
    byebug
    order = get_cart.generate_order(current_user, Address.find(params[:address_id]))
    session[:order_id] = order.id
    @order = order
    @summary = order.summary
    @shipping_cost = 100
    @total_price = PriceCalculator.new(@order).total_price
  end

  private

  def get_cart
    return Cart.new(session.key?(:cart) ? session[:cart] : [])
  end

  def cart_params
    params.require(:cart)
  end

  def redirect_if_no_cart
    if !session[:in_cart] || get_cart.empty?
      redirect_to action: :show
    end
  end
end
