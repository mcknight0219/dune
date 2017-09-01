class CreateWishes < ActiveRecord::Migration[5.0]
  def change
    create_table :wishes do |t|
      t.string :data
      t.references :user, foreign_key: true

      t.timestamps
    end
  end
end
