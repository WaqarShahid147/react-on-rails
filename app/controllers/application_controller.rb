# frozen_string_literal: true

class ApplicationController < ActionController::Base
  include DeviseTokenAuth::Concerns::SetUserByToken
  include ExceptionHandler
  include ResponseParser
  include Pundit

  private

  # Overwriting the sign_out redirect path method
  def after_sign_out_path_for(resource_or_scope)
    new_admin_session_path
  end
end
