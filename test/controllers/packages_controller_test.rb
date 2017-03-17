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
      assert_equal(3, Package.count)
    end
  end

  test 'user could create package' do
    perform_action_as @user do
      post packages_path, xhr: true, params: { package: { package_items: [{name: 'test', country: 'China', quantity: 1}], address_id: @address.id} }
      assert_response :success
      assert_equal(3, @user.packages.count)
      assert(PackageItem.find_by(:name => 'test'))
    end
  end

  test 'user can only delete his package' do
    other_package = users(:client).packages.first 
    perform_action_as @user do
      delete package_path(other_package.id), xhr: true
      assert_response :forbidden

      delete package_path(@package.id), xhr: true
      assert_response :success
    end
  end

  test 'admin gets all packages' do
    perform_action_as @admin do
      get packages_path + '.json', xhr: true
      assert_response :success

      packages = JSON.parse(response.body)['packages']
      assert_equal(4, packages.count)
    end
  end

  test 'normal user only sees his packages' do
    perform_action_as @user do
      get packages_path + '.json', xhr: true
      assert_response :success

      packages = JSON.parse(response.body)['packages']
      assert_equal(2, packages.count)
      assert_equal(@user.id, packages.first['user_id'])
      assert_equal(@user.id, packages.second['user_id'])
    end
  end

  test 'package contains address and items details' do
    perform_action_as @user do
      get packages_path + '.json', xhr: true
      assert_response :success

      address = JSON.parse(response.body)['packages'].first['address']
      items = JSON.parse(response.body)['packages'].first['package_items']
      assert(address)
      assert_equal('Qiang Guo', address['name'])

      assert(items)
      assert_equal(2, items.count)
    end
  end

  test 'update package' do
    perform_action_as @admin do
      assert_not(@package.is_received)
      put package_path(@package), params: {package: {is_received: true}}, xhr: true
      assert_response :success
      assert_not Package.find(@package.id).is_shipped
      assert Package.find(@package.id).is_received
    end
  end
end
