require 'test_helper'

class ProductTest < ActiveSupport::TestCase
  setup do
  end

  test 'active products' do
    assert_equal(1, Product.active.count)
  end

  test 'categorized scope' do
    assert_equal(1, Product.categorized(product_categories(:health).id).count)
  end

end
