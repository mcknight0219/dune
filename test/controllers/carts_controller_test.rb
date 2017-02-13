require 'test_helper'

class CartsControllerTest < ActionDispatch::IntegrationTest
  attr_accessor :json 
  test "return empty cart initially" do
    get cart_path, xhr: true
    assert_equal "application/json", @response.content_type
    assert_response(:success)
    assert_empty(JSON.parse(response.body))
  end

  test "add products to cart and update cart" do
    
  end

end
