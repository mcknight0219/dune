class OrdersController < ApplicationController
  respond_to :json
  load_and_authorize_resource

  def update
    Order.find(params['id']).update!(:shipped => true)
  end

  def index
    render :json => {orders: Order.all}
  end
end
