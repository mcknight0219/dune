class OrdersController < ApplicationController
  load_and_authorize_resource

  # Update only changes tracking number
  def update
    o = Order.find(params['id'])
    o.update(:tracking_number => params['tracking_number'])
    render :json => {success: o.errors.empty?}
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
          address: o.address.as_json(:except => ["created_at", "updated_at"]).merge({:id_front => o.address.id_front.url, :id_back => o.address.id_back.url}),
          total_price: PriceCalculator.new(o).total_price,
          items: summarize_order_details(o),
          created_at: o.created_at,
          tracking_number: o.tracking_number
      }
    end
  end

  def summarize_order_details(order)
    order.order_items.map { |i| i.product }
  end
end

