require 'test_helper'

class ProductsControllerTest < ActionDispatch::IntegrationTest
  include Devise::Test::IntegrationHelpers

  setup do
    @admin = users(:admin)
  end

  test 'categorization support on index page' do
    get products_path
    assert_equal(Product.count, css_select('#products-grid figure').count, 'all products should show')
    get products_path, params: { :category_id => product_categories(:other).id }
    assert_equal(3, css_select('#products-grid figure').count, 'only products of certain category should show')
    get products_path, params: { :category_id => product_categories(:other).id, :brand => 'Apple'}
    assert_equal(1, css_select('#products-grid figure').count, 'only products of certain category and brand should show')
  end

  test 'create new product through dashboard' do
    perform_action_as @admin do
      sz = Product.count
      post products_path, params: {:name => 'FishOil', :brand => 'Centrum', :detail => 'detail', :price => 9.99, :weight => 2.7, :product_category_id => product_categories(:health).id }, xhr: true
      assert_response :success
      assert_equal(sz+1, Product.count)

      body = JSON.parse response.body
      assert(body['product'])
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

      post products_path, params: {:name => 'FishOil', :brand => 'Centrum', :detail => 'detail', :price => 9.99, :weight => 2.7, :product_category_id => product_categories(:health).id }, xhr: true
      new_product = Product.find_by(name: 'FishOil')
      delete product_path(new_product.id), xhr: true
      assert_response :success
    end
  end
end
