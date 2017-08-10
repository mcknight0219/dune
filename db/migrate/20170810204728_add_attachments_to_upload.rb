class AddAttachmentsToUpload < ActiveRecord::Migration[5.0]
  def self.up
    change_table :uploads do |t|
      t.attachment :id_front
      t.attachment :id_back
    end
  end

  def self.down
    remove_attachment :uploads, :id_front
    remove_attachment :uploads, :id_back
  end
end
