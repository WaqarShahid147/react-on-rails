# frozen_string_literal: true

module Overrides
  class PasswordsController < DeviseTokenAuth::PasswordsController
    def render_create_error_missing_email
      raise_name_error(@resource)
    end

    def render_create_error
      raise_name_error(@resource)
    end

    def render_update_error_unauthorized
      raise_name_error(@resource)
    end

    def render_update_error_missing_password
      raise_name_error(@resource)
    end

    def render_update_error
      raise_name_error(@resource)
    end
  end
end
