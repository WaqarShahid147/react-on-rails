# frozen_string_literal: true

require_relative 'helpers/session_helpers'
require_relative 'helpers/request_helper'
require_relative 'helpers/wait_helper'

RSpec.configure do |config|
  config.include SpecHelpers::SessionHelpers, type: :system
  config.include RequestHelper, type: :request
  config.include WaitHelper, type: :system
end
