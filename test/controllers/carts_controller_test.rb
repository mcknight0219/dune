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
      put cart_path, xhr: true, params: {:cart => [{:id => @product1.id, :quantity => 1}, {:id => @product2.id, :quantity => 2}]}
      assert_response :success
      assert_equal(3, session[:cart].length)

      put cart_path, xhr: true, params: {:cart => [{:id => @product2.id, :quantity => 0}]}
      assert_response :success
      assert_equal(1, session[:cart].length)
      assert_equal(@product1.id, session[:cart].first.to_i)
    end
  end

  test "submit cart creates order and redirects to payments" do
    perform_action_as users(:client) do
      # add items to cart
      buy [{:id => @product1.id, :quantity => 1}, {:id => @product2.id, :quantity => 2}]
      # select an address
      addr = users(:client).addresses.first
      # go to payment
      post cart_path, params: { :cart => { :address_id => addr.id } }
      assert_redirected_to controller: 'payments', action: 'show'
      assert(session.key? :order_id)
    end
  end

  test 'submit cart fails' do
    perform_action_as users(:client) do
      buy [{:id => @product1.id, :quantity => 1}]

    end
  end

  private
  def buy(products)
    put cart_path, xhr: true, params: { :cart => products }
  end
end
