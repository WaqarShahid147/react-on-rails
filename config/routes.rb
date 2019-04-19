# frozen_string_literal: true

require 'api_constraints'

Rails.application.routes.draw do
  devise_for :admins, path: 'admins'

  namespace :admin do
    resources :user_settings
    root to: "dashboard#index"
  end
  constraints format: :json do
    mount_devise_token_auth_for 'User', at: 'auth',
      skip: [:omniauth_callbacks],
      controllers: {
        registrations:     'overrides/registrations',
        passwords:         'overrides/passwords',
        sessions:          'overrides/sessions',
        token_validations: 'overrides/token_validations'
      }

    namespace :api do
      namespace :v1 do
        resources :users, only: :index
        get '/profile', to: 'users#show', as: :user
      end
    end
  end
  root to: 'static_pages#home'
  get '*path', to: 'static_pages#home'
end
