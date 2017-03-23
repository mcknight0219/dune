require 'test_helper'

class CartsControllerTest < ActionDispatch::IntegrationTest
  include Devise::Test::IntegrationHelpers

  setup do
    @product1 = products(:fishoil)
    @product2 = products(:cream)
  end

  def assert_cart_size(expected)
    assert_equal(expected, @request.session['cart'].size)
  end

  test "return empty cart initially" do
    perform_action_as users(:client) do
      get cart_path + '.json', xhr: true
      assert_equal "application/json", @response.content_type
      assert_response(:success)
      assert_empty(JSON.parse(response.body)['cart'])
    end
  end

  test "update cart" do
    perform_action_as users(:client) do

    end
  end

  test "add products to cart and update cart" do
    perform_action_as users(:client) do
      put cart_path, xhr: true, params: {:items => [{:op => '+', :product => @product1.sku}, {:op => '+', :product => @product2.sku}]}
      assert_response(:success)
      cart = @request.session["cart"]
      assert_not_nil(cart)
      assert_equal(2, cart.size)
    end
  end

end
