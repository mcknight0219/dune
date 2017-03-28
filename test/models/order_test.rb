require 'test_helper'

class OrderTest < ActiveSupport::TestCase
  
  setup do
    @single_order = orders(:single_order)
    @multi_order = orders(:multiple_order)
  end
  
  test "can refund" do
    assert(@single_order.can_refund?)
    @single_order.ship(addresses(:canada_address))
    assert_not(@single_order.can_refund?)
  end

  test 'order must have one shipping address' do
    [@single_order, @multi_order].each { |order| assert(order.address) }
    # shipping address must belongs to user's address list
    assert(@single_order.user.addresses.include?(@single_order.address))
  end

  test 'cancel order' do
    cancelled = Order.cancel(@single_order.id)
    assert_nil(Order.find_by_id(cancelled.id))
  end

  test 'get detail summary on payment' do
    summary = @single_order.summary
    assert_equal(1,summary.size)
  end
end
