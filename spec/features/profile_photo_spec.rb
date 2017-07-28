require "rails_helper"

feature "profile photo" do
  scenario "user uploads a profile photo" do
    user_1 = User.create(first_name: "David", last_name: "Hasselhoff", email: "theHoff@yahoo.com", password: "password")
    location_1 = Location.create(name: "Some place", description: "Very nice place", address: "Some str.", city: "Boston", state: "MA", zip: "02116", user_id: user_1.id)

    visit root_path
    first(:link, "Sign Up").click
    fill_in "First name", with: "Howard"
    fill_in "Last name", with: "Stark"
    fill_in "Email", with: "ash@s-mart.com"
    fill_in "Password", with: "boomstick!3vilisd3ad"
    fill_in "Password confirmation", with: "boomstick!3vilisd3ad"
    attach_file "upload", "#{Rails.root}/spec/support/images/flower.jpg"
    click_button "Sign up"
    first(:link, "Profile").click
    expect(page).to have_css("img[src*='flower.jpg']")
  end
end
