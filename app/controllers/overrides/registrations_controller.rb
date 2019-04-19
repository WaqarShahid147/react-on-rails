# frozen_string_literal: true

module Overrides
  class RegistrationsController < DeviseTokenAuth::RegistrationsController
    def render_create_success
      render_success(@resource)
    end

    def render_create_error
      render_name_error(@resource)
    end

    def render_create_error_email_already_exists
      render_name_error(@resource)
    end

    def render_update_error
      render_name_error(@resource)
    end

    def render_update_error_user_not_found
      render_name_error(@resource)
    end
  end
end
