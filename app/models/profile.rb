class Profile < ApplicationRecord
  belongs_to :user

  validates_presence_of :name, :mobile
end
