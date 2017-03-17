class PackageItem < ApplicationRecord
  belongs_to :package

  validates :name, presence: true
  validates :quantity, presence: true, numericality: { greater_than: 0 }
end
