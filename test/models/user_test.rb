require 'test_helper'

class UserTest < ActiveSupport::TestCase
  setup do
    @admin = users(:admin)
    @client = users(:client)
  end

  test "test user role" do
    assert(@admin.admin?)
    assert_not(@client.admin?)
  end

  test "test ability" do
    order = @client.orders.new
    assert(@admin.can?([:delete, :update], order))
    assert(@client.cannot?([:delete, :update], order))
  end

  test 'user should have zero or more addresses' do
    assert_empty(@admin.addresses)
    assert_not_empty(@client.addresses)
    assert_equal(2, @client.addresses.count)
  end
end
