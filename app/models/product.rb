class Product < ApplicationRecord
  belongs_to :order
  validates :sku, presence: true, uniqueness: true
  validates_inclusion_of :category, in: %w( "health products", "cosmetics" )
  scope :active, -> { where(active: true) }
  
end
