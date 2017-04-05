class OrdersController < ApplicationController
  load_and_authorize_resource

  def update
    Order.find(params['id']).update!(:shipped => true)
    render :json => {success: true}
  end

  def show
    Order.find(params['id'])
  end

  def index
    render :json => {orders: decorate_result(current_user.orders)}
  end

  private
  def decorate_result(orders)
    orders.map do |o|
      {
          id: o.id,
          is_shipped: o.shipped,
          is_refunded: o.refunded,
          user: o.user.email,
          address: o.address,
          total_price: PriceCalculator.new(o).total_price,
          items: summarize_order_details(o)
      }
    end
  end

  def summarize_order_details(order)
    order.order_items.map { |i| i.product }
  end
end

