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

  test 'get csv file' do
    perform_action_as @admin do
      get packages_path + '.csv'
      assert_response :success
    end
  end
end
