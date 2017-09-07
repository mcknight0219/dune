class CreateCarousels < ActiveRecord::Migration[5.0]
  def change
    create_table :carousels do |t|

      t.timestamps
    end
  end
end
