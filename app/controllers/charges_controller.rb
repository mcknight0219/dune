class ChargesController < ApplicationController
  def new
    @amount = 200
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
end
