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

  
  test 'generate order on empty' do
    order = @cart.generate_order @u
    assert_nil(order)
  end

  test 'update cart' do
    @cart.update({:id => products(:fishoil).id, :quantity => 1})
    assert_equal(1, @cart.size)
  end

  test 'remove product totally' do
    populate_cart
    assert_equal(5, @cart.size)
    @cart.update({:id => products(:fishoil).id, :quantity => 0})
    assert_equal(3, @cart.size)
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
      @cart.update({ :quantity => 2, :id => products(:fishoil).id })
      @cart.update({ :quantity => 3, :id => products(:cream).id })
  end
end
