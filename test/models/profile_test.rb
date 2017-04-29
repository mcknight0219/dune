require 'test_helper'

class ProfileTest < ActiveSupport::TestCase
  test "assocaited with a user" do
    assert_equal(users(:qiang), profiles(:qiang).user)
    assert_equal(profiles(:admin), users(:admin).profile)
  end
end
