require 'test_helper'

class CartTest < ActiveSupport::TestCase
  setup do
    @cart = Cart.new
  end

  test 'initialize cart' do
    assert_empty(@cart.items)
  end


  test 'add item(s) to cart' do
    3.times do
      @cart.apply({:op => '+', :product => products(:fishoil).sku})
    end

    2.times do
      @cart.apply({:op => '+', :product => products(:cream).sku})
    end

    assert_equal(5, @cart.items.size)
  end

  test 'remove item(s) from cart' do
    2.times do
      @cart.apply({:op => '+', :product => products(:cream).sku})
    end
    assert_equal(2, @cart.items.size)
    @cart.apply({:op => '-', :product => products(:fishoil).sku})
    assert_equal(2, @cart.items.size)
    @cart.apply({:op => '-', :product => products(:cream).sku})
    assert_equal(1, @cart.items.size)
  end

  test 'generate orders' do
  end
end
