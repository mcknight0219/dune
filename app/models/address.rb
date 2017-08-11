class Address < ApplicationRecord
  belongs_to :user
  has_many :orders
  has_many :packages
  validates_presence_of :district, :state, :city, :address_line1, :post_code
  validate :has_contact_number

  has_attached_file :id_front
  has_attached_file :id_back
  validates_attachment_content_type :id_front, content_type: ["image/jpeg", "application/pdf", "image/png"]
  validates_attachment_content_type :id_back, content_type: ["image/jpeg", "application/pdf", "image/png"]

  def has_contact_number
    if phone.blank? && mobile.blank?
      erros[:base] = 'Must provide at least one contact number'
    end
  end
end
