# frozen_string_literal: true

require 'rails_helper'

describe 'User Logs In', type: :system do
  before do
    @user = create(:user)
  end
  def login
    visit '/'
    fill_in :email, with: @user.email
    fill_in :password, with: @user.password
    click_on 'Sign in'
  end

  def logout
    visit '/'
    click_on 'Logout'
  end

  scenario 'user logs in', js: true do
    login
    expect(page).to have_content('home')
  end

  scenario 'user logs out', js: true do
    logout
    expect(page).not_to have_content('home')
    expect(page).to have_content('Sign in')
  end
end
