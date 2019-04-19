# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Session', type: :request do
  describe 'user sessions CRUD' do
    before :all do
      params = FactoryBot.attributes_for(:user)
      post '/auth', params: params
      @user = User.find json_response[:data][:id]
    end

    it 'logs in successfully' do
      expect(response).to have_http_status(:success)
    end

    it 'logs out successfully' do
      delete destroy_user_session_path, params: auth_token
      expect(response).to have_http_status(:success)
    end

    it 'fails to login with wrong email' do
      params = { email: 'wrong_email@gmail.com',
                 password: @user.password }
      post user_session_path, params: params
      expect(response).to have_http_status(401)
    end

    it 'fails to login with wrong password' do
      params = { email: @user.email,
                 password: 'wrong password' }
      post user_session_path, params: params
      expect(response).to have_http_status(401)
    end
  end
end
