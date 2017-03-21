class AddGridsToProducts < ActiveRecord::Migration[5.0]
  def change
    add_column :products, :grids, :string
  end
end
