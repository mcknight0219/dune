class ProductsController < ApplicationController
  # 显示所有商品
  def index
    @products = Product.active
    respond_to do |format|
      format.json { render :json => @products }
      format.html { render 'index' }
    end
  end
  
  def show

  end
  
  def create

  end
  
  def new  

  end

  def update

  end
end
