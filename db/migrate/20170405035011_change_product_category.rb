class ChangeProductCategory < ActiveRecord::Migration[5.0]
  def change
    remove_column :product_categories, :parent_id
    add_reference :product_categories, :parent, index: true
  end
end
