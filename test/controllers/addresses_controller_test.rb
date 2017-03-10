require 'test_helper'

class AddressesControllerTest < ActionDispatch::IntegrationTest
  include Devise::Test::IntegrationHelpers

  setup do
    @admin = users(:admin)
    @client = users(:client)
  end

  test 'guest does not have access to address' do
    get addresses_path, xhr: true
    assert_response :forbidden
  end

  test 'admin could read all addresses' do
    perform_action_as @admin do
      get addresses_path, xhr: true
      assert_response :success

      body = JSON.parse response.body
      assert_equal(3, body['addresses'].count)
    end
  end

  test 'user can only see their addresses' do
    perform_action_as @client do
      get addresses_path, xhr: true
      assert_response :success

      body = JSON.parse response.body
      assert_equal(2, body['addresses'].count)
    end
  end

  test 'user creates address' do
    perform_action_as @client do
      post addresses_path, xhr: true, params: {:country => 'China', :state => 'Shannxi', :city => 'Baoji', :post_code => '1234567', :address_line1 => 'address', :address_line2 => '', :mobile => '0000000'}
      assert_response :success
      assert_not_nil(Address.find_by(:state => 'Shannxi'))
    end
  end

  test 'can not delete address still in use' do
    my_address = addresses(:canada_address)
    perform_action_as @client do
      delete address_path(my_address.id), xhr: true
      assert_response :forbidden
      body = JSON.parse response.body
      assert_match('address is still in use', body['error'])
    end
  end

  test 'user can delete their own address' do
    other_people_address = addresses(:new_address)
    perform_action_as @client do
      delete address_path(other_people_address.id), xhr: true
      assert_response :forbidden

      # create on address
      post addresses_path, xhr: true, params: {:country => 'China', :state => 'Shannxi', :city => 'Beijing', :post_code => '1234567', :address_line1 => 'address', :address_line2 => '', :mobile => '0000000'}
      new_address = Address.find_by(:city => 'Beijing')
      delete address_path(new_address.id), xhr: true
      assert_response :success
    end
  end

  test 'user can see their own address' do
    other_people_address = addresses(:new_address)
    perform_action_as @client do
      get address_path(other_people_address.id), xhr: true
      assert_response :forbidden

      get address_path(addresses(:canada_address).id), xhr: true
      assert_response :success
    end
  end
end

