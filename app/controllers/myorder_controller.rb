class MyorderController < ApplicationController
  before_action :authenticate_user!

  helper_method :item_lines, :total_price

  def index
    @orders = current_user.orders.paginate(:page => params[:page], :per_page => 8)
    @packages = current_user.packages.paginate(:page => params[:page], :per_page => 8)
  end

  def item_lines(order)
    order.summary
  end

  def total_price(order)
    PriceCalculator.new(order).total_price / 100
  end
end
