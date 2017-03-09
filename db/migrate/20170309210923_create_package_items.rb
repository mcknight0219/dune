class CreatePackageItems < ActiveRecord::Migration[5.0]
  def change
    create_table :package_items do |t|
      t.string :name
      t.integer :quantity
      t.float :price
      t.string :country

      t.timestamps
    end
  end
end
