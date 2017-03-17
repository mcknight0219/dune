class RemovePriceFromPackageItems < ActiveRecord::Migration[5.0]
  def change
    remove_column :package_items, :price
  end
end
