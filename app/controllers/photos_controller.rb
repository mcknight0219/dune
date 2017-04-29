class PhotosController < ApplicationController
  def show
    @package = Package.find_by(id: params[:id])
    not_found if @package.nil?
  end

  def create

  end
end