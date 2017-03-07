class DashboardController < ApplicationController
  before_action :redirect_if_not_admin
  layout 'simple_application'

  def index
  end
  
  private

  def redirect_if_not_admin
    redirect_to root_url unless current_user && current_user.admin?
  end

end
