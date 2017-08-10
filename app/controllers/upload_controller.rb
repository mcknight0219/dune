class UploadController < ApplicationController 
  before_action :authenticate_user!, :only => [:index]
  before_action :only_admin, :only => [:index]

  def index
    render :json => Upload.all.map { |u| decorate_upload(u) }
  end

  def new
    respond_to do |format|
      format.html { @upload = Upload.new }
    end
  end
  
  def create
    up = Upload.create upload_params
    if up.persisted?
      flash[:notice] = '上传成功！'
    else
      flash[:error] = up.errors
    end
    redirect_to '/upload'
  end

  def upload_params
    params.require(:upload).permit([:package, :id_number, :id_front, :id_back])
  end

  def decorate_upload(upload)
    upload.as_json(:excpet => ['created_at', 'updated_at'])
        .merge({:id_front => upload.id_front.url, :id_back => upload.id_back.url})
  end
end