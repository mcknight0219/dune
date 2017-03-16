class Package < ApplicationRecord
  belongs_to :user
  belongs_to :address
  has_many :package_items, dependent: :destroy
  before_save :default_values
  after_save  :make_serial_no

  attr_accessor :luxury
  
  def total_price
    total = 0
    package_items.each do |items|
      total += items.price * items.quantity
    end
    total
  end

  def make_serial_no
    unless self.serial
      prefix = self.luxury ? 'SU' : 'AC'
      self.update(:serial => prefix + (self.id.to_i + 170000).to_s)
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
