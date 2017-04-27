class PackageItem < ApplicationRecord
  belongs_to :package

  validates :name, presence: true
  validates :quantity, presence: true
  validates :brand, presence: true
end
