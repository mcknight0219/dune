class CreateUploads < ActiveRecord::Migration[5.0]
  def change
    create_table :uploads do |t|
      t.string :package
      t.string :id_number

      t.timestamps
    end
  end
end
