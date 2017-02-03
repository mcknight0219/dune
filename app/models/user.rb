class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  has_many :orders

  def ability
    @ability ||= Ability.new(self)
  end
  delegate :can?, :cannot?, :to => :ability
end
