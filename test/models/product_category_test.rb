require 'test_helper'

class ProductCategoryTest < ActiveSupport::TestCase
  test 'subcategory' do
    sub_categories = product_categories(:other).sub_categories
    assert_equal(1, sub_categories.count)
    assert_equal('衣服', sub_categories.first.name)
  end

  test 'is root category' do
    assert(product_categories(:other).root?)
    assert_not(product_categories(:vitamin).root?)
  end
end
