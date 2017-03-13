class PackagesController < ApplicationController
  before_action :authenticate_user!
  def index
    byebug
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
    new_package = current_user.packages.create(address: Address.find(params[:package][:address]))
    params['package']['package_items'].each do |item|
      new_package.package_items.create(item.permit(:quantity, :price, :country, :name))
    end
  end

  private

  def getPackages(user)
    if user.admin? then Packages.all else user.packages end
  end
end
