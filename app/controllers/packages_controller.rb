class PackagesController < ApplicationController
  before_action :authenticate_user!
  load_and_authorize_resource

  def index
    respond_to do |format|
      format.json { render :json => {packages: getPackages(current_user)} }
      format.html
    end
  end

  def show
  end

  def destroy
    Package.find(params[:id]).destroy!
  end

  def create
    new_package = current_user.packages.create package_params
    params['package']['package_items'].each do |item|
      new_package.package_items.create(item.permit(:quantity, :price, :country, :name))
    end
  end

  def update
    Package.find(params[:id]).update! package_params
  end

  private

  def getPackages(user)
    if user.admin? then Package.all else user.packages end
  end

  def package_params
    params.require(:package).permit(:is_received, :is_shipped, :is_cancelled, :address_id, :pickup, :pickup_address, :package_items, :note) 
  end
end
