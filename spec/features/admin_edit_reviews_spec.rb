require "rails_helper"

feature "admin can edit the reviews",
%Q{As an admin
 I want to be able to edit reviews
 So that I can change wrong or inappropriate information} do

# Acceptance Criteria:
#  [x] If I am logged in as an admin, I can visit the location show page and see that location's reviews
#  [x] If I am not logged in as an admin, I can't visit the location show page and see that location's reviews
#  [x] If I am logged in as an admin, I can edit the review


  scenario "Admin logs in and visit the location show page" do
    user_1 = User.create(first_name: "David", last_name: "Hasselhoff", email: "theHoff@yahoo.com", password: "password")
    admin = User.create(first_name: "John", last_name: "Smith", email: "jsmith@example.com", password: "admin123", admin: true)
    location_1 = Location.create(name: "Some place", description: "Very nice place", address: "Some str.", city: "Boston", state: "MA", zip: "02116", user_id: user_1.id)
    review_1 = Review.create(body: "What a great place", rating: 5, user_id: user_1.id, location_id: location_1.id, vote_count: 0)

    visit root_path
    first(:link, "Sign In").click
    fill_in 'Email', with: admin.email
    fill_in 'Password', with: admin.password
    click_button "Log in"
    first(:link, "All Locations List").click
    click_on "Some place"

    expect(page).to have_content review_1.body
  end

  scenario "Visitor logs in not as an admin and visit the location show page" do
    user_1 = User.create(first_name: "David", last_name: "Hasselhoff", email: "theHoff@yahoo.com", password: "password")
    admin = User.create(first_name: "John", last_name: "Smith", email: "jsmith@example.com", password: "admin123", admin: true)
    location_1 = Location.create(name: "Some place", description: "Very nice place", address: "Some str.", city: "Boston", state: "MA", zip: "02116", user_id: user_1.id)
    review_1 = Review.create(body: "What a great place", rating: 5, user_id: user_1.id, location_id: location_1.id, vote_count: 0)

    visit root_path
    first(:link, "Sign In").click
    fill_in 'Email', with: user_1.email
    fill_in 'Password', with: user_1.password
    click_button "Log in"

    expect(page).not_to have_content "All Locations List"
    expect{ get admin_locations_path }.to raise_error
  end


  scenario "Admin logs in and edit the review" do
    user_1 = User.create(first_name: "David", last_name: "Hasselhoff", email: "theHoff@yahoo.com", password: "password")
    admin = User.create(first_name: "John", last_name: "Smith", email: "jsmith@example.com", password: "admin123", admin: true)
    location_1 = Location.create(name: "Some place", description: "Very nice place", address: "Some str.", city: "Boston", state: "MA", zip: "02116", user_id: user_1.id)
    review_1 = Review.create(body: "What a great place", rating: 5, user_id: user_1.id, location_id: location_1.id, vote_count: 0)

    visit root_path
    first(:link, "Sign In").click
    fill_in 'Email', with: admin.email
    fill_in 'Password', with: admin.password
    click_button "Log in"
    first(:link, "All Locations List").click
    click_on "Some place"

    first(:link, "Edit Review").click
    fill_in 'Body', with: "Very bad place"
    fill_in 'Rating', with: 1
    click_button "Update Review"

    expect(page).to have_content "Very bad place"
  end
end
