# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

require "faker"

5.times do
  User.create(first_name: Faker::Zelda.character, last_name: Faker::Pokemon.name,email: Faker::Internet.free_email,password: Faker::Beer.name)
end

10.times do
  Location.create(name: Faker::HowIMetYourMother.character, description: Faker::Hipster.sentence(3),address: Faker::Address.street_address,city: Faker::Address.city,state: Faker::Address.state,zip: Faker::Address.zip,user_id: rand(1..User.all.length))
end

20.times do
  Review.create(body: Faker::Hipster.sentence(4),rating: rand(1..5),vote_count:0,user_id: rand(1..User.all.length),location_id: rand(1..Location.all.length))
end
