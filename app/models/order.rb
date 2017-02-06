class Order < ApplicationRecord
  belongs_to :user
  has_many :order_items

  def total_price
    self.order_items.map { |o| o.product.price }.reduce(:+)
  end
  
  def can_refund?
    !self.shipped
  end
  
  def ship(address)
    update(:shipped => true)
  end
end
