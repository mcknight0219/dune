class AddItemCategoryToPackageItems < ActiveRecord::Migration[5.0]
  def change
    add_reference :package_items, :item_category, foreign_key: true
    remove_column :package_items, :country
  end
end
