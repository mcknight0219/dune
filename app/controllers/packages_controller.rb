class PackagesController < ApplicationController
  before_action :authenticate_user!
  load_and_authorize_resource :except => [:confirm, :create]

  def index
    @package = Package.new
    respond_to do |format|
      format.json { render :json => {packages: getPackages(current_user).map { |p| replace_with_real_address_and_items p }} }
      format.html
    end
  end

  def new
    @categories = ItemCategory.all.map { |cat| [cat.name, cat.id]}
    unless session.has_key? :package_items
      session[:package_items] = []
    end
    @added = session[:package_items]
  end

  def add_package_item
    session[:package_items] << {name: params[:name], item_category_id: params[:category].to_i, quantity: params[:quantity]}
    redirect_to action: :new
  end

  def remove_package_item
    session[:package_items].delete_if { |item| item['name'] == params[:name] }
    redirect_to action: :new
  end

  def choose_address
    session[:package_luxury] = params[:luxury].present?
    @total = current_user.addresses.count
    @addresses = current_user.addresses.paginate(:page => params[:page], :per_page => 10)
    render 'packages/address'
  end

  def destroy
    Package.find(params[:id]).destroy!
  end

  def create
    new_package = current_user.packages.create luxury: session[:package_luxury], address_id: params[:address_id]
    session[:package_items].each do |item|
      new_package.package_items.create item
    end

    unless new_package.persisted?
      flash[:error] = '无法提交，请稍后重试'
      render 'index'
    else
      session.delete :package_items
      session.delete :package_luxury
      redirect_to :action => "confirm", :params => {id: new_package.serial}
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

  def getPackages(user)
    if user.admin? then Package.all else user.packages end
  end

  def package_params
    params.require(:package).permit(:is_received, :is_shipped, :is_cancelled, :address_id, :luxury)
  end

  def replace_with_real_address_and_items(package)
    package.as_json.merge({
                              address: package.address.as_json(:except => ["created_at", "updated_at"]).merge({:id_front => package.address.id_front.url, :id_back => package.address.id_back.url}),
                              package_items: package.package_items.as_json(:except => ["created_at", "updated_at", "package_id"])
    })
  end

end
