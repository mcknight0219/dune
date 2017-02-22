require 'test_helper'

class PriceCalculatorTest < ActiveSupport::TestCase
  setup do
    @order = orders(:single_order)
  end

  test 'make correct calculation or price' do
    assert_equal(2817, PriceCalculator.new(@order).total_price)
  end
end