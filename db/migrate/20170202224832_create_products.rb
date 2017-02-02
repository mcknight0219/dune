class CreateProducts < ActiveRecord::Migration[5.0]
  def change
    create_table :products do |t|
      t.string :sku
      t.string :name
      t.float :price
      t.float :weight
      t.string :dimension
      t.string :category
      t.string :detail
      t.boolean :active

      t.timestamps
    end
  end
end
