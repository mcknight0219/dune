class AddPickupAddressToPackages < ActiveRecord::Migration[5.0]
  def change
    add_column :packages, :pickup_address, :string
  end
end
