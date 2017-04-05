# coding: utf-8
class ProductsController < ApplicationController
  before_action :authenticate_user!, except: [:index, :show]

  # 显示所有商品
  def index
    respond_to do |format|
      format.json { render :json => { products: Product.all } }
      format.html {
        @categories = ProductCategory.top_levels
        @currentCategoryId = params[:category_id]
        if @currentCategoryId
          # include ones of children categories
          @products =Product.categorized(@currentCategoryId)
          @products = @products.where(brand: params[:brand]) if params[:brand]
          @brands = @products.pluck(:brand).uniq
        else
          @products = Product.all
          @brands = []
        end

        # do pagination
        @products = @products.paginate(:page => params[:page], :per_page => 12)
      }
    end
  end
  
  def show
    @product = Product.find(params[:id])
    respond_to do |format|
      format.json { render :json => { product: @product }}
      format.html
    end
  end
  
  def create
    p = Product.create params.permit([:name, :brand, :price, :shipping_price, :weight, :dimension, :detail, :product_category_id] + (1..9).map { |n| "image#{n}".to_sym })
    render :json => {product: p.as_json}
  end

  def update
    Product.find(params[:id]).update(product_params)
  end

  def destroy
    product = Product.find params[:id]
    if product.order_items.empty?
      product.destroy
      render :json => {success: true}
    else
      render :json => { success: false, error: 'Cannot delete product' }, :status => :forbidden
    end
  end

  private
  def product_params
    params.require(:product).permit([:name, :price, :shipping_price, :weight, :brand, :dimension, :detail, :product_category_id])
  end
end
