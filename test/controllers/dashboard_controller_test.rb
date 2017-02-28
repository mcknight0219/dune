require 'test_helper'

class DashboardControllerTest < ActionDispatch::IntegrationTest
  include Devise::Test::IntegrationHelpers

  setup do
    sign_in users(:client)
  end

  teardown do
    sign_out users(:client)
  end

  test 'only admin could access this page' do
    get dashboard_path
    assert_redirected_to root_url

    sign_in(users(:admin))
    get dashboard_path
    assert_response(:success)
  end
end
