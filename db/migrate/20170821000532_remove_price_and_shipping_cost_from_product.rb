class RemovePriceAndShippingCostFromProduct < ActiveRecord::Migration[5.0]
  def change
    remove_column :products, :price
    remove_column :products, :shipping_price
  end
end
