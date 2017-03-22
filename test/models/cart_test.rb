require 'test_helper'
require 'exceptions'

class CartTest < ActiveSupport::TestCase
  setup do
    @cart = Cart.new
    @u = users(:client)
  end

  test 'initialize cart' do
    assert_empty(@cart.items)
  end

  test 'initialize with items' do
    @cart = Cart.new([products(:fishoil)])
    assert_equal(1, @cart.size)
  end

  test 'add item(s) to cart' do
    3.times do
      @cart.apply({:op => '+', :product => products(:fishoil).id})
    end

    2.times do
      @cart.apply({:op => '+', :product => products(:cream).id})
    end

    assert_equal(5, @cart.size)
  end

  test 'remove item(s) from cart' do
    2.times do
      @cart.apply({:op => '+', :product => products(:cream).id})
    end
    assert_equal(2, @cart.size)
    @cart.apply({:op => '-', :product => products(:cream).id})
    assert_equal(1, @cart.size)
  end

  test 'remove product from cart' do
    populate_cart
    assert_equal(5, @cart.size)
    @cart.apply({:op => 'r', :product => products(:cream).id})
    assert_equal(2, @cart.size)
  end

  test 'clear cart' do
    @cart.apply :op => '+', :product => products(:cream).id
    assert_not(@cart.empty?)
    @cart.clear
    assert(@cart.empty?)
  end

  test 'generate order on empty' do
    order = @cart.generate_order @u
    assert_nil(order)
  end

  test 'generate order on single order item' do
    @cart.apply({:op => '+', :product => products(:cream).id})
    order = @cart.generate_order @u
    assert_not_nil(order)
    # make sure correct order is generated
    assert_equal(1, order.items)
  end

  test 'can not generate order for more than 99 items' do
    100.times do
      @cart.apply({:op => '+', :product => products(:fishoil).id})
    end

    assert_raises(::Exceptions::CartError) do
      @cart.generate_order @u
    end
  end

  test 'generate order on multiple order items' do
    2.times do
      @cart.apply :op => '+', :product => products(:fishoil).id
    end

    assert_nothing_raised do
      order = @cart.generate_order @u
      assert_equal(2, order.items)
    end
  end

  test 'to_json' do
    # empty cart
    json = @cart.to_json
    assert_empty(JSON.parse(json))
    
    # full cart
    populate_cart
    json = JSON.parse @cart.to_json
    assert_not_empty(json)
    assert_equal(2, json.count { |x| x == products(:fishoil).id })
    assert_equal(3, json.count { |x| x == products(:cream).id })
  end

  test 'response contains full description of cart' do
    populate_cart
    data = @cart.full_form
    assert_equal(2, data.size)
    assert_equal(2, data.first[:quantity])
    assert_equal(3, data.second[:quantity])

    assert(data.first[:product])
  end

  def populate_cart
    2.times do
      @cart.apply :op => '+', :product => products(:fishoil).id
    end

    3.times do
      @cart.apply :op => '+', :product => products(:cream).id
    end
  end
end
