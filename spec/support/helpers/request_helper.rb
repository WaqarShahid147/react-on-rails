# frozen_string_literal: true

module RequestHelper
  def json_response
    JSON.parse(response.body, symbolize_names: true)
  end

  def auth_token
    @auth_token ||= { 'access-token': response.header['access-token'],
                      client: response.header['client'],
                      uid: response.header['uid'] }
  end
end
