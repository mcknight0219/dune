class Order < ApplicationRecord
  belongs_to :user
  belongs_to :address
  has_many :order_items

  class << self
    def cancel(order_id)
      Order.find(order_id).delete
    end
  end

  def can_refund?
    !self.shipped
  end
  
  def ship(address)
    update(:shipped => true)
  end
end
