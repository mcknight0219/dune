class WishlistController < ApplicationController
    respond_to :json, :only => [:index]
    
    def index
      render json: {
        wishes: Wish.order(created_at: :desc).all.as_json(
          include: { user: {only: [:email] } },
          except: [:updated_at]
        )
      }
    end

    def new
      @wish = Wish.new
    end

    def create
      @wish = current_user.wishes.create params.require(:wish).permit(:data)
      if @wish.persisted?
        flash[:notice] = '提交成功，请记得回我们网站查看新品到达。'
        redirect_to :action => 'new'
      else
        flash.now[:error] = '提交失败，请稍后重试。'
        render :action => 'new'
      end
    end
end