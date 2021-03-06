class CreateOrders < ActiveRecord::Migration[5.0]
  def change
    create_table :orders do |t|
      t.integer :items
      t.boolean :refunded, :default => false
      t.boolean :shipped, :default => false
      t.timestamps
    end
  end
end
