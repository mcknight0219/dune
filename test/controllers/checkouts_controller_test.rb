require 'test_helper'

class CheckoutsControllerTest < ActionDispatch::IntegrationTest
  include Devise::Test::IntegrationHelpers
  setup do
    sign_in users(:client)
  end

  test 'get checkout items' do
    # populate cart first
    add_to_cart

    get checkout_path
    assert_response(:success)
    items = assigns(:checkout_items)
    assert_equal(2, items.size)
    assert_equal('Fish Oil', items[0].name)
    assert_equal(9.99, items[1].price)
    assert_equal(9.99*2, assigns(:total_price))
  end

  test 'error out if checkout empty cart' do
    get checkout_path
    assert_redirected_to(controller: 'home', action: 'index')
    assert_equal('Must not checkout zero products', flash[:error])
  end

  private
  def add_to_cart
    2.times do
      put cart_path, xhr: true, params: { :cart_items => [{:op => '+', :product => products(:fishoil).sku}] }
    end
  end

end
