class AddressesController < ApplicationController
  before_action :authenticate_user!
  load_and_authorize_resource

  def index
    unless user_signed_in?
      render :status => :forbidden, :json => {success: false}
    else
      addresses = current_user.admin? ? Address.all : current_user.addresses
      render :json => {addresses: addresses}
    end
  end

  def new
    authenticate_user!
    @address = current_user.addresses.new
  end

  def show
    render :json => {address: Address.find(params[:id])}
  end

  def edit
    @address = Address.find params[:id]
  end

  def destroy
    address = Address.find(params[:id])
    if address.orders.empty?
      address.destroy
      render :json => { success: true }
    else
      render :status => 403, :json => { success: false, error: 'address is still in use' }
    end
  end

  def create
    new_address = current_user.addresses.create address_params
    if new_address
      if params[:returnUrl]
        redirect_to params[:returnUrl]
      else
        redirect_to controller: 'packages', action: 'index'
      end
    else
      flash[:notice] = new_address.errors
      render :new
    end
  end

  def update
    updated = Address.find(params[:id]).update address_params
    if updated
      flash[:notice] = 'Your change is saved.'
    else
      flash[:error] = 'Error saving update. Please try later.'
    end
    if params[:returnUrl]
      redirect_to params[:returnUrl]
    else
      redirect_to action: :edit, id: params[:id]
    end
  end

  def address_params
    params.require(:address).permit(:name, :country, :state, :city, :post_code, :address_line1, :address_line2, :mobile, :phone, :id_front)
  end
end
