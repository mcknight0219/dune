class Product < ApplicationRecord
  belongs_to :order
  validates_presence_of :weight
  validates_inclusion_of :category, in: %w( health products, cosmetics )
  scope :active, -> { where(active: true) }
  before_save :default_values

  def default_values
    self.sku = Sku.new(self.category).to_str
    self.active = true
  end
end
