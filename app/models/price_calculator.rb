class PriceCalculator
  attr_reader :total_price

  def initialize(order)
    @total_price = order.order_items
                       .map { |oi| oi.product }
                       .map { |p| p.price * (1 + tax_rate(order.address)) + p.weight.kg.to.lb.value * shipping_cost(order.address) }.reduce(:+)
    # price must be integer, so unit is cent
    @total_price = (@total_price*100).to_i
  end

  def shipping_cost(address)
    # hard coded for now
    5.5
  end

  def tax_rate(address)
    0
  end
end