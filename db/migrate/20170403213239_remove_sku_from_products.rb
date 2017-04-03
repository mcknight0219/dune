class RemoveSkuFromProducts < ActiveRecord::Migration[5.0]
  def change
    remove_column :products, :sku
  end
end
