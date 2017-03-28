class PaymentsController < ApplicationController
  before_action :authenticate_user!

  def show
      @order = Order.find(session[:order_id])
      @summary = @order.summary
      @shipping_cost = 100
      @total_price = PriceCalculator.new(@order).total_price
  end

  def create
    byebug
    begin
      charge = Stripe::Charge.create(
        :amount => (PriceCalculator.new(Order.find(session['order_id'])).total_price).to_i,
        :currency => 'cad',
        :source => params[:stripeToken],
        :description => 'Cart checkout',
        :receipt_email => current_user.email
      )
      if charge[:paid]
        @order_id = session['order_id']
        render 'confirmation'
      end
    rescue Stripe::CardError => e
      flash[:alert] = e.message
      redirect_to action: :show
    end
  end
end
