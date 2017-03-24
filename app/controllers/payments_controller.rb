class PaymentsController < ApplicationController
  before_action :authenticate_user!

  def show
      @order = Order.find session[:order_id]
      @total_price = PriceCalculator.new(@order).total_price
  end

  def create
    begin
      charge = Stripe::Charge.create(
        :amount => (PriceCalculator.new(Order.find(session['order_id'])).total_price).to_i,
        :currency => 'cad',
        :source => params[:stripeToken],
        :description => 'Cart checkout'
      )
      if charge[:paid]
        render 'confirmation'
      end
    rescue Stripe::CardError => e
      flash[:alert] = e.message
      redirect_to action: :show
    end
  end

  def get_cart
    return Cart.new(session.key?('cart') ? session['cart'] : [])
  end

end
