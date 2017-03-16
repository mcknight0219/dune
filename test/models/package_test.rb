require 'test_helper'

class PackageTest < ActiveSupport::TestCase
  setup do
    @client = users(:qiang)
  end

  test 'association between package and user' do
    assert_equal(2, @client.packages.count)
    assert_equal(2, @client.packages.first.package_items.count)
  end

  test 'total price for package items' do
    assert_equal(2*999.99+99.99, @client.packages.first.total_price)
  end

  test 'user create package' do
    new_package = @client.packages.create(address: addresses(:canada_address))
    assert_not(new_package.is_received)
    assert_not(new_package.is_shipped)
    new_package_item = new_package.package_items.create(name: 'some thing', price: 1.1, quantity: 1, country: 'China')
    assert(new_package_item)
    assert_equal(@client, new_package_item.package.user)
  end

  test 'package should have correct serial number' do
    new_package = @client.packages.create(address: addresses(:canada_address), luxury: true) 
    assert_equal(expected_serial(new_package), new_package.serial)
  end

  def expected_serial(package)
    prefix = package.luxury ? 'SU' : 'AC'
    "#{prefix}#{(package.id.to_i + 170000).to_s}"
  end
end
