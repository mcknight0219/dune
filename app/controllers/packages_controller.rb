class PackagesController < ApplicationController
  respond_to :json, :only => [:index, :update]
  before_action :authenticate_user!

  def index
    render :json => { packages: get_packages(current_user).map { |p| decorate_package p }}
  end

  def new
  end

  def choose_type
    session[:package_luxury] = params[:type] == 'luxury'
    redirect_to action: :item
  end

  def item
    unless session.has_key? :package_items
      session[:package_items] = []
    end
    @luxury = session[:package_luxury]
    @added = session[:package_items]
  end

  def choose_address
    if session[:package_items].empty?
      flash[:error] = '请点击+来添加'
      redirect_to action: 'item'
      return
    end

    @total = current_user.addresses.count
    @addresses = current_user.addresses.paginate(:page => params[:page], :per_page => 10)
    render 'packages/address'
  end

  MAX_ITEM_PER_PACKAGE = 10
  def add_package_item
    if session[:package_items].count + 1 == MAX_ITEM_PER_PACKAGE
      flash[:error] = '太多放不下啦。请考虑分成多个包裹来寄送'
    else
      session[:package_items] << {name: params[:name], brand: params[:brand], specification: params[:specification], quantity: params[:quantity].to_i}
    end
    redirect_to action: :item
  end

  def remove_package_item
    session[:package_items].delete_if { |item| item['name'] == params[:item_name] && item['brand'] == params[:item_brand]}
    redirect_to action: :item
  end

  def destroy
    Package.find(params[:id]).destroy!
  end

  def create
    unless params[:address_id] && !params[:address_id].empty?
      flash[:error] = '必须选择一个地址'
      redirect_to :action => 'choose_address'
      return
    end

    new_package = current_user.packages.create luxury: session[:package_luxury], address_id: params[:address_id]
    session[:package_items].each do |item|
      new_package.package_items.create item
    end

    if !new_package.persisted?
      flash[:error] = '无法提交，请稍后重试'
      redirect_back fallback_location: new_package_path
    else
      session.delete :package_items
      session.delete :package_luxury
      redirect_to :action => 'confirm', :params => {id: new_package.serial}
    end
  end

  def confirm
    @confirm_id = params[:id]
    render :template => 'packages/success'
  end

  def update
    Package.find(params[:id]).update! package_params
    render :json => { success: true }
  end

  private

  def get_packages(user)
    if user.admin? then Package.all else user.packages end
  end

  def package_params
    params.require(:package).permit(:is_received, :is_shipped, :is_cancelled, :address_id, :luxury)
  end

  def decorate_package(package)
    package.as_json(:excpet => ['is_shipped', 'is_received', 'is_cancelled'])
        .merge({status: package.status, address: package.address.as_json(:except => ["created_at", "updated_at"]).merge({:id_front => package.address.id_front.url, :id_back => package.address.id_back.url}), package_items: package.package_items.as_json(:except => ["created_at", "updated_at", "package_id"])})
  end

end
