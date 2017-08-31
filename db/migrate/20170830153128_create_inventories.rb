class CreateInventories < ActiveRecord::Migration[5.0]
  def change
    create_table :inventories do |t|
      t.integer :stock, null: false
      t.boolean :offshelf, null: false, default: false
      t.references :product, foreign_key: true

      t.timestamps
    end
  end
end
