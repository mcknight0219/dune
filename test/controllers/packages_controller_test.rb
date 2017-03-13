require 'test_helper'

class PackagesControllerTest < ActionDispatch::IntegrationTest
  include Devise::Test::IntegrationHelpers

  setup do
    @admin = users(:admin)
    @user = users(:qiang)
    @address = @user.addresses.first
    @package = @user.packages.first
  end

  test 'delete package also deletes associated package_item' do
    perform_action_as @user do
      delete package_path(@package.id), xhr: true
      assert_response :success
      assert_equal(2, Package.count)
    end
  end

  test 'user could create package' do
    perform_action_as @user do
      post packages_path, xhr: true, params: { package: { package_items: [{name: 'test', country: 'China', price: 1.1, quantity: 1}], address: @address.id} }
      assert_response :success
      assert_equal(3, @user.packages.count)
      assert(PackageItem.find_by(:name => 'test'))
    end
  end

  test 'admin get all packages' do
    perform_action_as @admin do
      get packages_path, :xhr => true
      assert_response :success
      packages = JSON.parse(response.body)
    end
  end
end
