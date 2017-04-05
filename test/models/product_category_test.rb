require 'test_helper'

class ProductCategoryTest < ActiveSupport::TestCase
  setup do
    @other = product_categories(:other)
    @health = product_categories(:health)
    @vitamin = product_categories(:vitamin)
  end

  test 'relationship' do
    assert_equal(@health, @vitamin.parent)
    assert_equal(1, @health.subcategories.count)
  end

  test 'descendants' do
    assert_equal(2, @other.descendants.count)
    assert_equal(1, @health.descendants.count)
    assert_equal(0, @vitamin.descendants.count)
  end
end
