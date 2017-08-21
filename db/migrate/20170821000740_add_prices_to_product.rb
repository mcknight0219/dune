class AddPricesToProduct < ActiveRecord::Migration[5.0]
  def change
    add_column :products, :price1, :float
    add_column :products, :price2, :float
    add_column :products, :price3, :float
    add_column :products, :price4, :float
    add_column :products, :price5, :float
    add_column :products, :price6, :float
  end
end
