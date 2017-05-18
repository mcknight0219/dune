class ProfilesController < ApplicationController
  before_action :authenticate_user!
  def new
    if params[:return]
      session[:return] = Base64.decode64(params[:return])
    end
    @profile = Profile.new
  end

  def edit
    @profile = Profile.find(params[:id])
  end

  def show
    @profile = Profile.find_by_id(params[:id])
    if @profile.nil?
      redirect_to action: :new and return
    end
  end

  def create
    p = Profile.create(profile_params.merge(user: current_user))
    if p.persisted?
      if session[:return]
        url = session[:return]
        session.delete :return
        redirect_to url and return
      else
        flash[:notice] = '新建成功'
        redirect_to profile_path(p.id)
      end
    else
      flash[:error] = p.errors
      redirect_to action: new
    end
  end

  def update
    Profile.update profile_params
    flash[:notice] = '保存成功'
    redirect_back fallback_location: :root_path
  end

  def profile_params
    params.require(:profile).permit(:name, :mobile)
  end
end