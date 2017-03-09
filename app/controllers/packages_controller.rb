
# Disallow updating package after submitted
class PackagesController < ApplicationController
  before_action :authenticate_user!

  def index

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
end