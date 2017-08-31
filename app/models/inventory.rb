class Inventory < ApplicationRecord
  belongs_to :product
  validates :stock, presence: true, numericality: { greater_than_or_equal_to: 0 }

  def in_stock?
    enough?(1)
  end

  def available?
    !self.offshelf
  end

  def enough?(count)
    self.stock - count >= 0
  end

  # reset stock. usually overridden by administrator
  def reset(count)
    if count >= 0
      self.stock = count
      save!
    end
  end

  def adjust_count(value)
    raise Exceptions::NotEnoughStockError.new if value < 0 and not enough?(value.abs)
    with_lock do
      self.stock = self.stock + value
      save!
    end
  end 
end
