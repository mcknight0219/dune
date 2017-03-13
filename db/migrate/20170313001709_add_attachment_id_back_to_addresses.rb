class AddAttachmentIdBackToAddresses < ActiveRecord::Migration
  def self.up
    change_table :addresses do |t|
      t.attachment :id_back
    end
  end

  def self.down
    remove_attachment :addresses, :id_back
  end
end
