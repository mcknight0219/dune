require 'test_helper'

class ProductTest < ActiveSupport::TestCase
  setup do
    @off_shelf = products(:offshelf)
  end

  test 'active products' do
    assert_equal(3, Product.active.count)
    assert_not(@off_shelf.active)
  end

  test 'categorized scope' do
    assert_equal(3, Product.categorized(product_categories(:other).id).count)
    assert_equal(0, Product.categorized(1).count)
  end

  test 'get category path' do

  end
end
