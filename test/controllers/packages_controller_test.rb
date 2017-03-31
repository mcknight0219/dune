require 'test_helper'

class PackagesControllerTest < ActionDispatch::IntegrationTest
  include Devise::Test::IntegrationHelpers

  setup do
    @admin = users(:admin)
    @client = users(:client)
  end

  test 'get a list of packages' do
    perform_action_as @admin do
      get packages_path, xhr: :json
      assert_response :success
      payload = JSON.parse response.body
      assert(payload['packages'])
      assert_equal(4, payload['packages'].count, 'Admin should see all packages')
    end

    perform_action_as @client do
      get packages_path, xhr: :json
      assert_response :success
      payload = JSON.parse response.body
      assert_equal(1, payload['packages'].count, 'User should only see his packages')
    end
  end

  test 'can add/rm package item' do
    perform_action_as @client do
      get new_package_path
      assert_response :success
      assert(assigns(:added).empty?)

      post '/packages/add', params: {name: '包', category: item_categories(:bag).id, quantity: '1个'}
      assert_redirected_to action: :new
      follow_redirect!
      assert_equal(1,assigns(:added).count, 'An item should be added')

      post '/packages/remove', params: {name: '包'}
      assert_redirected_to action: :new
      follow_redirect!
      assert(assigns(:added).empty?, 'Item should be deleted')
    end
  end

  test 'choose address' do
    perform_action_as @client do
      get new_package_path
      post '/packages/add', params: {name: '包', category: item_categories(:bag).id, quantity: '1个'}
      get '/packages/address', headers: {'HTTP_REFERER' =>  new_package_url}

      assert_equal(2, assigns(:total))
    end
  end

  test 'create package request' do
    perform_action_as @client do
      get new_package_path
      post '/packages/add', params: {name: '包', category: item_categories(:bag).id, quantity: '1个'}
      get '/packages/address', headers: {'HTTP_REFERER' =>  new_package_url}
      post packages_path, params: {address_id: @client.addresses.first.id}, headers: {'HTTP_REFERER' =>  packages_url}
      assert_response :redirect
      follow_redirect!
    end
  end

  test 'no access to address selection unless from new package' do
    perform_action_as @client do
      get '/packages/address'
      assert_redirected_to action: :new
    end
  end
end
