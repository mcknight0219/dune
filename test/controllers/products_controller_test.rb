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

  test 'create new product through dashboard' do
    perform_action_as @admin do
      sz = Product.count
      post products_path, params: {:name => 'FishOil', :price => 9.99, :weight => 2.7, :detail => '', :category => 'health products'}, xhr: true
      assert_response :success
      assert_equal(sz+1, Product.count)

      body = JSON.parse response.body
      assert(body["product"])
    end
  end

  test 'update product' do
    perform_action_as @admin do
      product = Product.first
      put product_path(product.id), xhr: true, params: {:product => {:price => 19.99}}
      assert_response :success
      assert_equal(19.99, Product.find(product.id).price)
    end
  end

  test 'delete product' do
    perform_action_as @admin do
      delete product_path(Product.first.id), xhr: true
      assert_response :forbidden

      post products_path, params: {:name => 'Switch', :price => 9.99, :weight => 2.7, :detail => '', :category => 'health products'}, xhr: true
      new_product = Product.find_by(name: 'Switch')
      delete product_path(new_product.id), xhr: true
      assert_response :success
    end
  end
end
