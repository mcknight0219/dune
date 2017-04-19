class RenameSpecificationToPackageItems < ActiveRecord::Migration[5.0]
  def change
    remove_column :package_items, :quantity
    add_column :package_items, :quantity, :integer
    add_column :package_items, :specification, :string
  end
end
