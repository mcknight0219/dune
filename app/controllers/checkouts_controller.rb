class CheckoutsController < ApplicationController
  def show
    cart = get_cart
    if cart.empty?
      flash[:error] = 'Must not checkout zero products'
      redirect_to :root
    end

    @checkout_items = cart.items.map { |sku| Product.find_by sku: sku }
    byebug
    order = cart.generate_order(current_user)
  end

  def create
    begin
      Stripe::Charge.create(
        :amount => 200 * 100,
        :currency => 'cad',
        :source => params[:stripeToken],
        :description => 'Cart checkout'
      )
      
    rescue Stripe::CardError => e
      flash[:error] = e.message
      redirect_to_new_charge_path
    end

  end
 
  private
  def get_cart
    if session['cart'].nil?
      new_cart = Cart.new
      session['cart'] = new_cart
      return new_cart
    else
      return Cart.new(session['cart']['items'])
    end
  end

end
