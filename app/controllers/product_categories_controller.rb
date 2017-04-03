class ProductCategoriesController < ApplicationController
  respond_to :json
  before_action :authenticate_user!
  before_action :only_admin, except: [:index]

  def index
    render json: ProductCategory.all.as_json(except: [:updated_at, :created_at])
  end

  def create
    entry = ProductCategory.create params.require(:product_category).permit(:name, :parent_id)
    render json: {success: entry.persisted?, productCategory: entry.as_json(except: [:created_at, :updated_at])}
  end

  def destroy
    ProductCategory.find(params[:id]).destroy
    render json: {success: true}
  end

end
