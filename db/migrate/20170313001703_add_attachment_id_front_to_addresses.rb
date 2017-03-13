class AddAttachmentIdFrontToAddresses < ActiveRecord::Migration
  def self.up
    change_table :addresses do |t|
      t.attachment :id_front
    end
  end

  def self.down
    remove_attachment :addresses, :id_front
  end
end
