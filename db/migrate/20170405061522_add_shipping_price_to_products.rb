class AddShippingPriceToProducts < ActiveRecord::Migration[5.0]
  def change
    add_column :products, :shipping_price, :integer
  end
end
