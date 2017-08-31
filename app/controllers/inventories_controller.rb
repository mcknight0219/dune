require 'exceptions'

# For admin to modify store's stock 
class InventoriesController < ApplicationController
  before_action :authenticate_user!
  before_action :only_admin
  respond_to :json
  
  def index
    render json: Inventory.all.as_json(
      only: [:stock],
      include: { product: { only: [:name, :brand, :id] }}
    )
  end
  
  def update
    unless verify_adjust_count then render status: :bad_request, json: { error: 'must provide adjustment as an integer' } and return end
    unless ivt = extract_inventory_or_bailout then render status: 404, json: { error: 'Couldn\'t find inventory' } and return end
    
    begin
      ivt.adjust_count(params[:adjustment].to_i)
      render json: ivt.as_json(only: [:stock])
    rescue Exceptions::NotEnoughStockError => e
      render json: {error: 'Couldn\'t not update stock'}, status: :bad_request
    end    
  end

  private

  def verify_adjust_count
    params.has_key?(:adjustment) && params[:adjustment].to_i != 0
  end

  def extract_inventory_or_bailout
    params.has_key?(:id) && Inventory.find_by(id: params[:id])
  end
end