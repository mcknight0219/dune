
class Tracking
  attr_reader :type

  def initialize(num)
    @num = num
    @type = num[0..1] == 'AC' ? :normal : :luxury
  end

  # Make actual HTTP request
  def track
  end
end