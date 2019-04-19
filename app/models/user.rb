# frozen_string_literal: true

class User < ApplicationRecord
  # Include default devise modules.
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
  include DeviseTokenAuth::Concerns::User

  validates_presence_of :email, uniqueness: true, case_sensitive: false

  def token_validation_response
    UserSerializer.new(self).as_json
  end
end
