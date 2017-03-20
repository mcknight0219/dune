class AddCoverToProducts < ActiveRecord::Migration[5.0]
  def change
    add_column :products, :cover, :string
  end
end
