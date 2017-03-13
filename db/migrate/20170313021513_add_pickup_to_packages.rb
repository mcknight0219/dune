class AddPickupToPackages < ActiveRecord::Migration[5.0]
  def change
    add_column :packages, :pickup, :boolean
  end
end
