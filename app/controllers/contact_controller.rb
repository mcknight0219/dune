class ContactController < ApplicationController
  def index
    @contact = Contact.new
  end

  def create
    @contact = Contact.create contact_params
    if @contact.persisted?
        flash[:notice] = '您的信息我们已经收到 ！'
        redirect_to contact_path
    else
        flash.now[:error] = '无法提交，请稍后重试'
        render :index
    end
  end

  private

  def contact_params
    params.require(:contact).permit(:name, :email, :phone, :message)
  end
end
