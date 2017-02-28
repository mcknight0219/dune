require 'test_helper'

class OrdersControllerTest < ActionDispatch::IntegrationTest
  include Devise::Test::IntegrationHelpers

  setup do
    @client = users(:client)
    @qiang  = users(:qiang)
    @admin  = users(:admin)
  end

  test 'only signed user can see orders' do
    get orders_path, xhr: true
    assert_response :forbidden

    perform_action_as @client do
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
      assert_response 204
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
end
