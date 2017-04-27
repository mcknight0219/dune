require 'test_helper'

class PackageTest < ActiveSupport::TestCase
  setup do
    @client = users(:qiang)
  end

  test 'generate csv' do
    lines = read_csv(Package.to_csv(filter: {luxury: true}))
    assert_equal(3, lines.count)
    assert_equal(Package.class_variable_get('@@CSV_HEADER_LUXURY'), lines.first)
  end

  test 'serial number' do
    p = @client.packages.create(address:addresses(:canada_address), luxury: true)
    assert_equal('SU', p.serial[0, 2])

    p = @client.packages.create(address:addresses(:canada_address), luxury: false)
    assert_equal('AC', p.serial[0, 2])
  end

  test 'get status of package' do
    new_package = @client.packages.create(address: addresses(:canada_address), luxury: true)
    assert_equal('pending', new_package.status)
    new_package.is_received = true
    assert_equal('received', new_package.status)
    new_package.is_shipped = true
    assert_equal('shipped', new_package.status)
  end

  def expected_serial(package)
    prefix = package.luxury ? 'SU' : 'AC'
    base = package.luxury ? 160000 : 180000
    "#{prefix}#{(package.id.to_i + base).to_s}"
  end

  def read_csv(str)
    CSV.parse(str).map { |l| l }
  end
end
