
class Tracking
  attr_reader :type

  def initialize(num)
    @num = num
    @type = num[0..1] == 'AC' ? :normal : :luxury
    @aggregator = @type == :normal ? CCT.new(@num) : Sureton.new(@num)
  end

  # Tracking information data with date as key and status as value 
  def track
    @aggregator.track
  end

  # EMS tracking number if there is any, nil otherwise
  def ems
    @aggregator.ems
  end

end