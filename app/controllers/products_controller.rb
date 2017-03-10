# coding: utf-8
class ProductsController < ApplicationController
  respond_to :json, only: [:show, :create, :update, :destroy]
  load_and_authorize_resource

  # 显示所有商品
  def index
    @products = Product.active
    respond_to do |format|
      format.json { render :json => { products: @products } }
      format.html { render 'index' }
    end
  end
  
  def show
    render :json => { product: Product.find(params[:id]) }
  end
  
  def create
    p = Product.create product_params
    render :json => {product: p}
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
    params.require(:product).permit([:name, :price, :weight, :dimension, :detail, :category])
  end
end
