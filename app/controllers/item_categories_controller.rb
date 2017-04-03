class ItemCategoriesController < ApplicationController
  respond_to :json
  before_action :authenticate_user!
  before_action :only_admin, except: [:index]
  
  def index
    render json: ItemCategory.all.as_json(:except => [:created_at, :updated_at])
  end

  def create
    entry = ItemCategory.create params.require(:item_category).permit(:name)
    render json: {success: true, itemCategory: entry.as_json(:except => [:created_at, :updated_at])}
  end

  def destroy
    ItemCategory.find(params[:id]).destroy
    render json: {success: true}
  end
end
