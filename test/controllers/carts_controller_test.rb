require 'test_helper'

class CartsControllerTest < ActionDispatch::IntegrationTest
  include Devise::Test::IntegrationHelpers

  setup do
    @client = users(:client)
    @laptop = products(:mbp)
  end

  test 'add product to cart' do
    perform_action_as @client do
      post new_cart_path, params: {product: @laptop.id}
      assert_redirected_to action: :show
      follow_redirect!
      assert_equal(1, assigns(:cart).count, 'Cart should contain one product')
    end
  end

  test 'updates quantity of product' do
    perform_action_as @client do
      post new_cart_path, params: {product: @laptop.id}
      follow_redirect!
      put  cart_path, params: {id: @laptop.id, quantity: 3}
      assert_redirected_to action: :show
      follow_redirect!
      assert_equal(3, assigns(:cart).first[:quantity], 'Cart should be updated with item quantity')
    end
  end

  test 'removes item from cart' do
    perform_action_as @client do
      post new_cart_path, params: { product: @laptop.id }
      follow_redirect!
      delete cart_path, params: { id: @laptop.id }
      assert_redirected_to action: :show
      follow_redirect!
      assert_empty(assigns(:cart), 'cart should be empty')
    end
  end

  test 'chooses shipping address' do
    perform_action_as @client do
      post new_cart_path, params: { product: @laptop.id }
      follow_redirect!
      get '/cart/address', headers: {'HTTP_REFERER' =>  cart_url}
      assert_equal(2, assigns(:total), 'user should have two addresses')
    end
  end

  test 'arrives at order review' do
    perform_action_as @client do
      post new_cart_path, params: { product: @laptop.id }
      follow_redirect!
      get '/cart/order', params: { address_id: @client.addresses.first.id }, headers: {'HTTP_REFERER' =>  cart_address_url}
      # At this stage, the order is created
      assert_equal(1, assigns(:order).order_items.count, 'order should contain exactly one item')
    end
  end

  test 'no access to address selection unless in order' do
    perform_action_as @client do
      get '/cart/address'
      assert_redirected_to cart_path
      get '/cart/order'
    end
  end

end
