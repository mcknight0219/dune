class HomeController < ApplicationController
  def index
    @carousels = Carousel.all.map { |c| c.image.url }
  end
end
