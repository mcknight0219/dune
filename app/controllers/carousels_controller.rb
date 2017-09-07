# Only used in admin backend
class CarouselsController < ApplicationController
  before_action :authenticate_user!
  before_action :only_admin
  respond_to :json
  
  def index
    render :json => {
      carousels: Carousel.all.map { |c| { id: c.id, image: c.image.url } }
    }
  end
  
  def create
    e = Carousel.create(image: params[:carousel])
    status, error = e.persisted? ? [200, nil] : [400, e.errors.on(:image)]
    render :json => error.nil? ? { carousel: { image: e.image.url, id: e.id } } : { error: error}, :status => status
  end

  def destroy
    e = Carousel.find params[:id] 
    if e && e.destroy
      render json: {success: true}
    else
      render json: {}, status: 400
    end
  end 
end