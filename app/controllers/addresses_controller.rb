class AddressesController < ApplicationController
  respond_to :json
  load_and_authorize_resource

  def index
    unless user_signed_in?
      render :status => :forbidden, :json => {success: false}
    else
      addresses = current_user.admin? ? Address.all : current_user.addresses
      render :json => {addresses: addresses}
    end
  end

  def show
    render :json => {address: Address.find(params[:id])}
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
    current_user.addresses.create(address_param)
    render :json => {success: true}
  end

  private

  def address_param
    params.permit([:country, :state, :city, :post_code, :address_line1, :address_line2, :mobile, :phone])
  end
end