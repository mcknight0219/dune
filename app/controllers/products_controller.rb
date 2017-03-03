# coding: utf-8
class ProductsController < ApplicationController
  respond_to :json, only: [:show, :create, :update]
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
    Product.new(params.permit(:name, :price, :weight, :dimension, :detail, :cateogry)) do |p|
      p.active = true

    end
  end

  def update

  end

  def delete

  end
end
