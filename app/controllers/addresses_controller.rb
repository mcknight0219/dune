class AddressesController < ApplicationController
  before_action :authenticate_user!
  load_and_authorize_resource

  def index
    addresses = current_user.admin? ? Address.all : current_user.addresses
    render :json => {addresses: addresses}
  end

  def new
    if params[:return].present?
      session[:return] = Base64.decode64(params[:return])
    end
    @address = current_user.addresses.new
  end

  def show
    render :json => {address: Address.find(params[:id])}
  end

  def edit
    if params[:return].present?
      session[:return] = Base64.decode64(params[:return])
    end
    @address = Address.find params[:id]
  end

  def destroy
    address = Address.find(params[:id])
    respond_to do |format|
      format.json {
        if address.orders.empty?
          address.destroy
          render :json => { success: true }
        else
          render :status => 403, :json => { success: false, error: 'address is still in use' }
        end
      }
      format.html {
        if address.orders.empty?
          address.destroy
        else
          flash[:error] = '无法删除该地址'
        end
        redirect_back fallback_location: :root_path
      }
    end
  end

  def create
    new_address = current_user.addresses.create address_params
    if new_address.persisted?
      redirection = session[:return]
      if redirection
        session.delete :return
        redirect_to redirection
      else
        redirect_back fallback_location: :root_path
      end
    else
      flash[:errors] = new_address.errors
      render :new
    end
  end

  def update
    updated = Address.find(params[:id]).update address_params
    if updated
      redirection = session[:return]
      if redirection
        session.delete :return
        redirect_to redirection
      else
        redirect_back :root_path
      end
    else
      flash[:error] = 'Error saving update. Please try later.'
      redirect_to action: :edit, id: params[:id]
    end
  end

  def address_params
    params.require(:address).permit(:name, :country, :state, :city, :post_code, :address_line1, :address_line2, :mobile, :phone, :id_number, :id_front, :id_back)
  end
end
