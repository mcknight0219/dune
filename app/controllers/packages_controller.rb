class PackagesController < ApplicationController
  before_action :authenticate_user!
  load_and_authorize_resource

  def index
    respond_to do |format|
      format.json { render :json => {packages: getPackages(current_user).map { |p| replace_with_real_address_and_items p }} }
      format.html
    end
  end

  def destroy
    Package.find(params[:id]).destroy!
  end

  def create
    new_package = current_user.packages.create package_params
    byebug
    params['package']['package_items'].each do |item|
      new_package.package_items.create(item.permit(:quantity, :country, :name))
    end

    unless new_package.persisted?
      flash[:error] = '无法提交，请稍后重试'
      render 'index'
    else
      @confirm_id = new_package.serial
      render :template => 'packages/success'
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
    params.require(:package).permit(:is_received, :is_shipped, :is_cancelled, :address_id,  :package_items, :luxury) 
  end

  def replace_with_real_address_and_items(package)
    package.as_json.merge({
      address: package.address.as_json(:except => ["created_at", "updated_at"]), 
      package_items: package.package_items.as_json(:except => ["created_at", "updated_at", "package_id"])
    })
  end

end
