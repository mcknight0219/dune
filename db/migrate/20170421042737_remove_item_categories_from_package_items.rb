class RemoveItemCategoriesFromPackageItems < ActiveRecord::Migration[5.0]
  def change
    remove_reference :package_items, :item_category
    add_column :package_items, :brand, :string
    drop_table :item_categories
  end
end
