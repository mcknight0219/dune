class CreateAddresses < ActiveRecord::Migration[5.0]
  def change
    create_table :addresses do |t|
      # 基本信息
      t.string  :country
      t.string  :state
      t.string  :city
      t.string  :post_code
      t.string  :address_line1
      t.string  :address_line2
      # 联系方式
      t.string  :phone
      t.string  :mobile, :null => false
      t.timestamps
    end
  end
end
