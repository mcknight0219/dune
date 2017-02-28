require 'test_helper'

class ProductsControllerTest < ActionDispatch::IntegrationTest
  include Devise::Test::IntegrationHelpers

  setup do
    @client = users(:client)
    @admin = users(:admin)
  end

  test 'all can view products' do
    get products_path, xhr: true
    assert_response :success
  end

  test 'only admin can create product' do
    perform_action_as @client do
      post products_path, xhr: true
      assert_response :forbidden
    end

    perform_action_as @admin do
      post products_path, xhr: true
      assert_response 204
    end
  end

  test 'admin can create a new product' do
    perform_action_as @admin do
      old_val = Product.count
      post products_path, xhr: true, params: {name: 'new product', price: 0.99, weight: 2, category: 'cosmetics'}
      assert_response 204
      assert_equal(old_val + 1, Product.count)
    end
  end
end
