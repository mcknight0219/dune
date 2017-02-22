require 'test_helper'
require 'stripe_mock'

class CheckoutsControllerTest < ActionDispatch::IntegrationTest
  include Devise::Test::IntegrationHelpers
  setup do
    sign_in users(:client)
  end

  teardown do
    sign_out users(:client)
  end

  test 'must checkout as a registered user' do
    sign_out users(:client)
    get checkout_path
    assert_redirected_to(new_user_session_path)
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

  test 'checkout successfully' do
    add_to_cart
    get checkout_path

    StripeMock.start
    charge = Stripe::Charge.create(
        amount: 999,
        currency: 'USD',
        source: StripeMock.create_test_helper.generate_card_token,
        description: 'card charge'
    )
    post checkout_path, params: {:stripeToken => StripeMock.create_test_helper.generate_card_token}
    assert_response(:success)
    assert_template "confirmation"
    StripeMock.stop
  end

  private
  def add_to_cart
    2.times do
      put cart_path, xhr: true, params: { :cart_items => [{:op => '+', :product => products(:fishoil).sku}] }
    end
  end

end
