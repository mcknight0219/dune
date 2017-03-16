class AddSerialToPackages < ActiveRecord::Migration[5.0]
  def change
    add_column :packages, :serial, :string
    add_index :packages, :serial
  end
end
