class AddAttachmentImagesToProducts < ActiveRecord::Migration
  def self.up
    change_table :products do |t|
      (1..9).each do |i|
        t.attachment "image#{i}".to_sym
      end
    end
  end

  def self.down
    (1..9).each do |i|
      remove_attachment :products, "image#{i}".to_sym
    end
    remove_attachment :products, :images
  end
end
