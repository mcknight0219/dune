class Product < ApplicationRecord
  has_many :order_items
  validates_presence_of :weight
  validates_inclusion_of :category, in: ["health products", "cosmetics"]
  scope :active, -> { where(active: true) }
  before_save :default_values

  def default_values
    self.sku ||= Sku.new(self.category).to_str
    self.active ||= true
  end
end
