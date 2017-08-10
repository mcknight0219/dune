class Upload < ApplicationRecord
  has_attached_file :id_front
  has_attached_file :id_back
  validates_attachment_content_type :id_front, content_type: ["image/jpeg", "application/pdf", "image/png"]
  validates_attachment_content_type :id_back, content_type: ["image/jpeg", "application/pdf", "image/png"]
end
