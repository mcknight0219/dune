class PhotosController < ApplicationController
  def show
    @is_order = params[:context] == 'order'
    @order_or_package = params[:context].upcase_first.constantize.find(params[:id])
    not_found if @order_or_package.nil?
  end

  def create
    unless ['package', 'order'].include? params[:context]
      flash[:error] = '只能上传属于订单或寄件的照片'
      redirect_to action :show
      return  
    end
    
    params[:context].upcase_first.constantize.find(params[:id]).address.update photo_params
    flash[:notice] = "上传成功"
    redirect_to action: :show
  end

  def photo_params
    params.permit(:id_front, :id_back, :id_number)
  end
end