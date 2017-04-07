class DashboardController < ApplicationController
  before_action :require_admin
  layout 'simple_application'

  def index
  end
  
  private

  def require_admin
    redirect_to root_url unless current_user && current_user.admin?
  end

end
