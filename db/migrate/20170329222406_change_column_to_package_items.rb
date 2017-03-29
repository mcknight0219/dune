class ChangeColumnToPackageItems < ActiveRecord::Migration[5.0]
  def change
    change_column(:package_items, :quantity, :string)
  end
end
