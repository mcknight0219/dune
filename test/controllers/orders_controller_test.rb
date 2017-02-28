require 'test_helper'

class OrdersControllerTest < ActionDispatch::IntegrationTest

  test 'only signed user can see orders' do
    get orders_path
    assert_response 401
  end

  test 'regular users can only get their own orders' do

  end

  test 'regular users can not edit their orders' do

  end

  test 'admin can see all orders' do

  end
end
