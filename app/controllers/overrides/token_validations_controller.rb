# frozen_string_literal: true

module Overrides
  class TokenValidationsController < DeviseTokenAuth::TokenValidationsController
    def render_validate_token_error
      render_unauthorized_error
    end
  end
end
