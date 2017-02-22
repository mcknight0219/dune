class CheckoutsController < ApplicationController
  before_action :only_registered_user, :only => [:show]
  before_action :retrieve_and_verify_cart

  def show
      @checkout_items = @cart.items.map { |sku| Product.find_by sku: sku }
      @order = @cart.generate_order(current_user)
      session['order_id'] = @order.id
      @total_price = @order.total_price
  end

  def create
    begin
      charge = Stripe::Charge.create(
        :amount => (Order.find(session['order_id']).total_price * 100).to_i,
        :currency => 'cad',
        :source => params[:stripeToken],
        :description => 'Cart checkout'
      )
      if charge[:paid]
        render 'confirmation'
      end
    rescue Stripe::CardError => e
      flash[:error] = e.message
      redirect_to_new_charge_path
    end
  end

  def only_registered_user
    unless current_user
      redirect_to new_user_session_path
    end
  end

  def retrieve_and_verify_cart
    @cart = get_cart
    if @cart.empty?
      flash[:error] = 'Must not checkout zero products'
      redirect_to :root
    end
  end

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
