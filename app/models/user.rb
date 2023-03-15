class User < ApplicationRecord
  devise :database_authenticatable, :rememberable, :trackable
  validates :email, :emp_id, presence: true
  validates :email, uniqueness: true
  has_many :user_roles
  has_many :roles, through: :user_roles
end
