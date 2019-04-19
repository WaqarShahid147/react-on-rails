# frozen_string_literal: true

source 'https://rubygems.org'

git_source(:github) do |repo_name|
  repo_name = "#{repo_name}/#{repo_name}" unless repo_name.include?('/')
  "https://github.com/#{repo_name}.git"
end

gem 'active_model_serializers', '~> 0.10.0'
gem 'airbrake'
gem 'carrierwave', '~> 1.0'
gem 'decent_exposure', '3.0.0'
gem 'devise'
gem 'devise_token_auth'
gem 'factory_bot_rails'
gem 'fast_jsonapi'
gem 'fastimage'
gem 'figaro'
gem 'hashie-forbidden_attributes'
gem 'jquery-rails'
gem 'mini_magick'
gem 'newrelic_rpm'
gem 'nokogiri'
gem 'omniauth'
gem 'pg', '~> 0.18'
gem 'puma', '~> 3.7'
gem 'pundit'
gem 'rails', '5.1.4'
gem 'sass-rails', '~> 5.0.4'
gem 'secure_headers', require: false
gem 'sidekiq'
gem 'slim-rails'
gem 'simple_form'
gem 'uglifier', '>= 1.3.0'
gem 'webpacker', '~> 3.0'
gem 'capybara'

group :staging, :production do
  gem 'lograge'
  gem 'rack-timeout'
end

group :development, :test do
  gem 'bullet'
  gem 'byebug'
  gem 'database_cleaner'
  gem 'faker', git: 'https://github.com/stympy/faker.git', branch: 'master'
  gem 'foreman'
  # gem 'memory_profiler'
  # gem 'rack-mini-profiler', require: false
  gem 'ruby-prof'
  gem 'yard'
end

group :development do
  gem 'brakeman'
  gem 'letter_opener'
  gem 'listen', '>= 3.0.5', '< 3.2'
  gem 'nullalign'
  gem 'rubocop', require: false
  gem 'spring'
  gem 'spring-commands-rspec'
  gem 'spring-watcher-listen', '~> 2.0.0'
  gem 'web-console', '>= 3.3.0'
end

group :test do
  gem 'bundler-audit', require: false
  gem 'rspec-rails', '~> 3.7'
  gem 'rspec_junit_formatter'
  gem 'shoulda-matchers'
  gem 'simplecov', require: false
  gem 'webmock', '3.3.0'
  gem 'selenium-webdriver', '~> 3.8.0'
  gem 'chromedriver-helper'
end
