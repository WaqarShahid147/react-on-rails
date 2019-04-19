# frozen_string_literal: true

RSpec.shared_context 'signed in user' do
  include Warden::Test::Helpers
  before do
    Warden.test_mode!
    login_as(@user, scope: :user)
  end

  after(:each) do
    Warden.test_reset!
  end
end
