class CreateContacts < ActiveRecord::Migration[5.0]
  def change
    create_table :contacts do |t|
      t.string :name
      t.string :email
      t.string :phone
      t.string :message

      t.timestamps
    end
    add_index :contacts, :email
  end
end
