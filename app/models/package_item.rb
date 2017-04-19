class PackageItem < ApplicationRecord
  belongs_to :package
  belongs_to :item_category

  alias category item_category

  validates :name, presence: true
  validates :quantity, presence: true
  validates :specification, presence: true
end
