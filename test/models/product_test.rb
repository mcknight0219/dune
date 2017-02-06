require 'test_helper'

class ProductTest < ActiveSupport::TestCase
  setup do
    @off_shelf = products(:offshelf)
  end
  
  test "active products" do
    assert_equal(2, Product.active.count)
    assert_not(@off_shelf.active)
  end
end
