class CreatePackages < ActiveRecord::Migration[5.0]
  def change
    create_table :packages do |t|
      t.references :address, foreign_key: true
      t.references :user, foreign_key: true
      t.boolean :is_shipped
      t.boolean :is_received
      t.boolean :is_cancelled

      t.timestamps
    end
  end
end
