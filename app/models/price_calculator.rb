class PriceCalculator
  attr_reader :total_price, :shipping_cost

  def initialize(order)
    @shipping_cost = get_shipping_cost(order.address)
    @total_price = order.order_items
                       .map { |oi| oi.product }
                       .map { |p| p.price }
                       .reduce(:+)
    @total_price += @shipping_cost
    # price must be integer, so unit is cent
    @total_price = (@total_price * 100).to_i
  end

  def get_shipping_cost(address)
    # hard coded for now
    0
  end

  def get_tax_rate(address)
    0
  end
end