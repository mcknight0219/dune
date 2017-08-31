class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  before_action :detect_device_variant
  helper ApplicationHelper
  
  rescue_from CanCan::AccessDenied do |exception|
    respond_to do |format|
      format.json { head :forbidden, content_type: 'application/json' }
      format.html { head :forbidden, content_type: 'text/html' }
    end
  end

  def detect_device_variant
    request.variant = :mobile if browser.device.mobile?
  end

  def get_cart
    return Cart.new(session.key?('cart') ? session['cart'] : [])
  end

  def only_admin
    unless current_user.admin?
      render json: {:success => false}, status: :forbidden
    end
  end

  def not_found
    raise ActionController::RoutingError.new('Not Found')
  end
end
