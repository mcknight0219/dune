class ProductCategory < ApplicationRecord

  def sub_categories
    ProductCategory.where(parent_id: id)
  end

  def root?
    parent_id.nil?
  end
end
