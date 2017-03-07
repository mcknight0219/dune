require 'test_helper'

class ProductTest < ActiveSupport::TestCase
  setup do
    @off_shelf = products(:offshelf)
  end
  
  test "active products" do
    assert_equal(3, Product.active.count)
    assert_not(@off_shelf.active)
  end

  test "new product becomes active immediately" do
    assert Product.create(:name => 'Product', :price => 1, :weight => 1, :category => 'cosmetics').active
  end

  test "new prodcut has correct SKU" do
    p = Product.create(:name => 'Dabao', :price => 20, :weight => 1.1, :category => 'cosmetics')
    assert_equal('CO00002', p.sku)
    p = Product.create(:name => 'Baiqueling', :price => 2, :weight => 0.1, :category => 'cosmetics')
    assert_equal('CO00003', p.sku)
  end
end
