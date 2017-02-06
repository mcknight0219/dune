require 'test_helper'

class OrderTest < ActiveSupport::TestCase
  
  setup do
    @single_order = orders(:single_order)
    @multi_order = orders(:multiple_order)
  end
  
  test "calculate total price" do
    item = @single_order.order_items.first
    assert_equal(item.product.price, @single_order.total_price)
    
    items = @multi_order.order_items
    total = items[0].product.price + items[1].product.price
    assert_equal(total, @multi_order.total_price)
  end
  
  test "can refund" do
    assert(@single_order.can_refund?)
    @single_order.ship(addresses(:canada_address))
    assert_not(@single_order.can_refund?)
  end
end
