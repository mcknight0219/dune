class Package < ApplicationRecord
  belongs_to :user
  belongs_to :address
  has_many :package_items, dependent: :destroy
  before_save :default_values

  def total_price
    total = 0
    package_items.each do |items|
      total += items.price * items.quantity
    end
    total
  end

  private

  def default_values
    self.is_shipped ||= false
    self.is_received ||= false
    self.is_cancelled ||= false
  end
end
