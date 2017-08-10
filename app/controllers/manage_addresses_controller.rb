class ManageAddressesController < ApplicationController
  before_action :authenticate_user!

  def index
    @total = current_user.addresses.count
    @addresses = current_user.addresses.paginate(:page => params[:page], :per_page => 10)
  end
end