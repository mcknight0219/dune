require 'test_helper'

class SkuTest < ActiveSupport::TestCase
  test 'generate valid sku' do
    assert_equal('CO00001', Sku.new(:cosmetic).to_str)
  end
end
