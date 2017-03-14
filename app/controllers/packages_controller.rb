class PackagesController < ApplicationController
  before_action :authenticate_user!
  load_and_authorize_resource

  def index
    respond_to do |format|
      format.json { render :json => {packages: getPackages(current_user).map { |p| replace_with_real_address p}} }
      format.html
    end
  end

  def destroy
    Package.find(params[:id]).destroy!
  end

  def create
    new_package = current_user.packages.create package_params
    params['package']['package_items'].each do |item|
      new_package.package_items.create(item.permit(:quantity, :price, :country, :name))
    end
    unless new_package.persisted?
      flash[:error] = '无法提交，请稍后重试'
    else
      flash[:notice] = '已提交，我们将会尽快处理'
    end
    render 'index'
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

  def replace_with_real_address(package)
    package.as_json.merge({address: package.address.as_json})
  end
end
