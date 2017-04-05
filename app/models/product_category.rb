class ProductCategory < ApplicationRecord
  has_many :subcategories, class_name: 'ProductCategory',
           foreign_key: "parent_id"
  belongs_to :parent, class_name: "ProductCategory"

  def self.top_levels
    ProductCategory.where(parent_id: nil)
  end

  def descendants
    subcategories.map do |category|
      [category] + (category.descendants.flatten || [])
    end.flatten
  end

end
