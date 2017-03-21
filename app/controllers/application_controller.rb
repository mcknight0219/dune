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
end
