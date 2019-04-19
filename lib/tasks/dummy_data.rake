# frozen_string_literal: true

namespace :dummy_data do
  desc 'Generate dummy data'
  task create: [:environment] do
    FactoryBot.create_list(:recipe_search, 5)
    users = FactoryBot.create_list(:user, 5)
    users.each do |u|
      collection = FactoryBot.create(:collection, user: u)
      FactoryBot.create_list(:recipe, 3, collections: [collection])
    end
    puts 'Dummy data created'
  end
end
