class AddIdNumberToAddresses < ActiveRecord::Migration[5.0]
  def change
    add_column :addresses, :id_number, :string
  end
end
