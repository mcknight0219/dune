require 'test_helper'
require 'exceptions.rb'

class InventoryTest < ActiveSupport::TestCase
  setup do
    @target = inventories(:one)
  end

  test "inventory should reflex product stock" do
    assert @target.in_stock?
    assert_not @target.enough? 2
    assert @target.available?
  end

  test "adjust inventory" do
    @target.adjust_count(1)
    assert_equal(2, @target.stock)
    @target.adjust_count(-2)
    assert_equal(0, @target.stock)
  end

  test 'should not adjust count of amount greater than at hand' do
    assert_equal(1, @target.stock) 
    assert_raises(Exceptions::NotEnoughStockError) {
      @target.adjust_count(-2)
    } 
    assert_equal(1, @target.stock)
  end

  test 'associate with product' do
    product = products(:fishoil)
    assert_equal(product.inventory, @target)
    assert_equal(product, @target.product)
  end
end
