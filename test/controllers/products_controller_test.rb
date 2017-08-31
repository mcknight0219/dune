require 'test_helper'

class ProductsControllerTest < ActionDispatch::IntegrationTest
  include Devise::Test::IntegrationHelpers

  setup do
    @admin = users(:admin)
    @client = users(:client)
  end
  
  test 'get product also contains inventory info' do
    get products_path, headers: { "Accept" => 'application/json' }
    assert_response :success
    
    products = (JSON.parse response.body)['products']
    assert_not_empty(products)
    assert products.first['inventory']
    assert_equal 1, products.first['inventory']['stock']
  end

  test 'get single product also contains inventory info' do
    get product_url(products(:fishoil).id), headers: { 'Accept' => 'application/json' }
    assert_response :success

    product = (JSON.parse response.body)['product']
    assert_not_empty product
    assert product['inventory']
    assert_equal 1, product['inventory']['stock']
    assert product['inventory']['id']
  end

  test 'create new product through dashboard' do
    perform_action_as @admin do
      post products_path, params: {:name => 'Ddrop', :inventory => 5, :brand => 'Centrum', :detail => 'detail', :price1 => 9.99, :price2 => 9.99, :price3 => 9.99,:price4 => 9.99,:price5 => 9.99,:price6 => 9.99,:weight => 2.7, :product_category_id => product_categories(:health).id }, xhr: true
      assert_response :success
      # We have one created from fixures
      assert_equal(2, Product.count)

      new_product = Product.find_by(name: 'Ddrop')
      assert_equal(5, new_product.inventory.stock)
    end
  end

  test 'update product' do
    perform_action_as @admin do
      product = Product.first
      put product_path(product.id), xhr: true, params: {:price1 => 19.99}
      assert_response :success
      assert_equal(19.99, Product.find(product.id).price1)
    end
  end
end
