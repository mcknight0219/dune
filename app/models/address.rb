class Address < ApplicationRecord
  belongs_to :user
  has_many :orders
  validates_presence_of :country, :state, :city, :address_line1, :post_code
  validate :has_contact_number

  has_attached_file :id_front, styles: { medium: "300x300>" }
  validates_attachment_content_type :id_front, content_type: /\Aimage\/.*\z/

  def has_contact_number
    if phone.blank? && mobile.blank?
      erros[:base] = 'Must provide at least one contact number'
    end
  end
end
