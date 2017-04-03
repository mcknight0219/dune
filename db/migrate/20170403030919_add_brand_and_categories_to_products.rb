class AddBrandAndCategoriesToProducts < ActiveRecord::Migration[5.0]
  def change
    remove_column :products, :category
    add_column :products, :brand, :string
    add_reference :products, :product_category, foreign_key: true
  end
end
