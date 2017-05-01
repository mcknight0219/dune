class PhotosController < ApplicationController
  def show
    @package = Package.find_by(id: params[:id])
    not_found if @package.nil?
  end

  def create
    Package.find(params[:id]).address.update photo_params
    flash[:notice] = "上传成功。"
    redirect_to action: :show
  end

  def photo_params
    params.permit(:id_front, :id_back, :id_number)
  end
end