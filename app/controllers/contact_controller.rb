class ContactController < ApplicationController
  def index
    @contact = Contact.new
  end

  def create
    Contact.create contact_params
    flash[:notice] = '您的信息我们已经收到 ！'
    redirect_to contact_path
  end

  private

  def contact_params
    params.require(:contact).permit(:name, :email, :phone, :message)
  end
end
