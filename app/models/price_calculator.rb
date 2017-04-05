class PriceCalculator
  attr_reader :total_price, :shipping_price

  def initialize(order)
    @shipping_price = get_shipping_cost(order)
    @total_price = order.order_items
                       .map { |oi| oi.product }
                       .map { |p| p.price }
                       .reduce(:+)
    @total_price += shipping_price
    # price must be integer, so unit is cent
    @total_price = (total_price * 100).round(2)
  end

  def get_shipping_cost(order)
    order.order_items.reduce(0) { |sum, oi| sum + oi.product.shipping_price }
  end
end