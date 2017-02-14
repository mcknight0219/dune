require 'test_helper'

class CartsControllerTest < ActionDispatch::IntegrationTest

  setup do
    @product1 = products(:fishoil)
    @product2 = products(:cream)
  end


  test "return empty cart initially" do
    get cart_path, xhr: true
    assert_equal "application/json", @response.content_type
    assert_response(:success)
    assert_empty(JSON.parse(response.body))
  end

  test "add products to cart and update cart" do
    put cart_path, xhr: true, params: { :cart_items => [{:op => '+', :product => @product1.sku}, {:op => '+', :product => @product2.sku}] }
    assert_response(:success)
    cart = @request.session["cart"]
    assert_not_nil(cart)
    assert_equal(2, cart.size)
  end

  test "could not update cart" do
    put cart_path, xhr: true, params: { :cart_items => [{:op => '-', :product => @product1.sku}] }
    assert_response(:error)
    assert_match('could not update cart', JSON.parse(response.body)["error"])
    assert_empty(JSON.parse(response.body)["items"])
  end
end
