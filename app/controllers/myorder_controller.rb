class MyorderController < ApplicationController
  before_action :authenticate_user!

  helper_method :item_lines, :total_price

  def index
    @orders = current_user.orders
    @packages = current_user.packages
  end

  def item_lines(order)
    order.summary
  end

  def total_price(order)
    PriceCalculator.new(order).total_price / 100
  end
end
