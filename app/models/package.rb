class Package < ApplicationRecord
  belongs_to :user
  belongs_to :address
  has_many :package_items, dependent: :destroy
  before_save :default_values
  after_save  :make_serial_no

  attr_accessor :luxury

  def make_serial_no
    unless self.serial
      prefix = self.luxury ? 'SU' : 'AC'
      self.update(:serial => prefix + (self.id.to_i + 170000).to_s)
    end
  end

  def status
    if is_shipped
      return 'shipped'
    elsif is_received
      return 'received'
    else
      return 'pending'
    end
  end
  private

  def default_values
    self.is_shipped ||= false
    self.is_received ||= false
    self.is_cancelled ||= false
    self.luxury ||= false
  end
end
