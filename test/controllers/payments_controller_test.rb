require 'test_helper'
require 'stripe_mock'

class PaymentsControllerTest < ActionDispatch::IntegrationTest
  include Devise::Test::IntegrationHelpers

  test 'checkout successfully' do
    StripeMock.start
    charge = Stripe::Charge.create(
        amount: 999,
        currency: 'USD',
        source: StripeMock.create_test_helper.generate_card_token,
        description: 'card charge'
    )
    perform_action_as users(:client) do
      post payments_path, params: {:stripeToken => StripeMock.create_test_helper.generate_card_token}
      assert_response(:success)
      assert_not_nil(session[:order_id])
      assert_template "confirmation"
    end
    StripeMock.stop
  end

  test 'checkout failed and redirect' do
    StripeMock.start
    StripeMock.prepare_card_error(:card_declined)
    perform_action_as users(:client) do
      post payments_path, params: {:stripeToken => StripeMock.create_test_helper.generate_card_token}
      assert_response(:redirect)
      assert_equal('The card was declined', flash[:alert])
    end
    StripeMock.stop
  end

end
