require 'test_helper'

class InventoriesControllerTest < ActionDispatch::IntegrationTest
  include Devise::Test::IntegrationHelpers

  setup do
    @me = users(:admin)
    @guest = users(:client)
    @inventory = inventories(:one)
  end

  test 'admin should be able to access' do
    perform_action_as @me do
      get inventories_path, xhr: true
      assert_response :success
      inventories = JSON.parse response.body
      assert_equal(1, inventories.count)
      assert_equal(1, inventories.first['stock'])
    end
  end

  test 'other user doesn\'t have access' do 
    perform_action_as @guest do
      get inventories_path, xhr: true
      assert_response :forbidden
    end
  end

  test 'admin could modify inventory' do
    perform_action_as @me do
      put inventory_url(@inventory.id), params: { :adjustment => 2 }, xhr: true
      assert_response :success
      ivt = JSON.parse(response.body)
      assert_equal 3, ivt['stock']
    end
  end

  test 'guard against illegal input' do
    perform_action_as @me do
      # empty payload
      put inventory_url(@inventory.id), params: {}, xhr: true
      assert_response 400
      # larger than at hand
      put inventory_url(@inventory.id), params: { adjustment: -100 }, xhr: true
      assert_response 400
      # none-existent
      put inventory_url(@inventory.id + 1), params: { adjustment: 1 }, xhr: true
      assert_response 404
    end
  end
end