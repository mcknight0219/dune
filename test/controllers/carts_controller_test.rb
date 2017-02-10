require 'test_helper'

class CartsControllerTest < ActionDispatch::IntegrationTest
  test "return empty cart initially" do
    get cart_path, xhr: true
  end
end
