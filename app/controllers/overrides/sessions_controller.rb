# frozen_string_literal: true

module Overrides
  class SessionsController < DeviseTokenAuth::SessionsController
    def render_create_error_bad_credentials
      render_unauthorized_error
    end
  end
end
