require 'test_helper'

class OrdersControllerTest < ActionDispatch::IntegrationTest
  include Devise::Test::IntegrationHelpers

  setup do
    @client = users(:client)
    @qiang  = users(:qiang)
    @admin  = users(:admin)
  end

  test 'user can see their orders' do
    perform_action_as @qiang do
      get orders_path, xhr: true
      assert_response :success
    end

    perform_action_as @admin do
      get orders_path, xhr: true
      assert_response :success
    end
  end

  test 'regular users can only get their own orders' do
    perform_action_as @qiang do
      get order_path(orders(:new_order).id), xhr: true
      assert_response :success

      get order_path(orders(:single_order).id), xhr: true
      assert_response :forbidden
    end
  end

  test 'admin can access all orders' do
    perform_action_as @admin do
      get order_path(orders(:new_order).id), xhr: true
      assert_response :success

      put order_path(orders(:single_order).id), xhr: true
      assert_response 200
    end
  end

  test 'regular users can not edit their orders' do
    perform_action_as @qiang do
      put order_path(orders(:new_order).id), xhr: true
      assert_response :forbidden

      put order_path(orders(:single_order).id), xhr: true
      assert_response :forbidden
    end
  end

  test 'get order with sufficient data' do
    perform_action_as @qiang do
      get orders_path, xhr: true
      assert_response :success

      orders = JSON.parse(response.body)
      assert(orders['orders'].size, 1)
      order = orders['orders'].first
      assert_equal(order['user'], 'qiang@gmail.com')
      assert_equal(order['address']['country'], '中国')
      assert_equal(1, order['items']['EL00001'])
    end
  end
end
