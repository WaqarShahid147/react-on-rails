# frozen_string_literal: true

module Api
  module V1
    class UsersController < ApplicationController
      before_action :authenticate_user!

      def index
        render json: User.all
      end

      def show
        render json: current_user
      end
    end
  end
end
