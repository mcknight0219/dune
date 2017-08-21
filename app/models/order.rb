class Order < ApplicationRecord
  belongs_to :user
  belongs_to :address
  has_many :order_items, :dependent => :destroy

  class << self
    def cancel(order_id)
      Order.find(order_id).destroy
    end
  end

  def can_refund?
    !self.shipped
  end
  
  def ship(address)
    update(:shipped => true)
  end

  def summary
    self.order_items.each_with_object({}) do |item, hsh|
      if hsh.has_key?(item.product.name)
        hsh[item.product.name][:quantity] += 1
        quantity = hsh[item.product.name][:quantity]
        hsh[item.product.name][:price] = item.product["price#{quantity}"]
      else
        hsh[item.product.name] = {quantity: 1, price: item.product.price1}
      end
    end
  end
end
