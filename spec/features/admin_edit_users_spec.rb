require "rails_helper"

feature "admin can edit the users info",
%Q{As an admin
 I want to be able to edit users's information
 So that i can change some users info} do

# Acceptance Criteria:
#  [x] If I am logged in as an admin, I can visit the list of all users page
#  [x] If I am not logged in as an admin, I can't visit the list of all users page
#  [x] If I am logged in as an admin, I can edit the user's information


  scenario "Admin logs in and visit the users index page" do
    user_1 = User.create(first_name: "David", last_name: "Hasselhoff", email: "theHoff@yahoo.com", password: "password")
    admin = User.create(first_name: "John", last_name: "Smith", email: "jsmith@example.com", password: "admin123", admin: true)
    location_1 = Location.create(name: "Some place", description: "Very nice place", address: "Some str.", city: "Boston", state: "MA", zip: "02116", user_id: user_1.id)


    visit root_path
    first(:link, "Sign In").click

    fill_in 'Email', with: admin.email
    fill_in 'Password', with: admin.password
    click_button "Log in"

    first(:link, "All Users List").click

    expect(page).to have_content user_1.first_name
    expect(page).to have_content user_1.last_name
  end

  scenario "Visitor logs in not as admin and visit the users index page" do
    user_1 = User.create(first_name: "David", last_name: "Hasselhoff", email: "theHoff@yahoo.com", password: "password")
    location_1 = Location.create(name: "Some place", description: "Very nice place", address: "Some str.", city: "Boston", state: "MA", zip: "02116", user_id: user_1.id)


    visit root_path
    first(:link, "Sign In").click

    fill_in 'Email', with: user_1.email
    fill_in 'Password', with: user_1.password
    click_button "Log in"

    expect(page).not_to have_content "All Users List"

    expect{ get users_path }.to raise_error
  end

  scenario "Admin logs in and edit the user info" do
    user_1 = User.create(first_name: "David", last_name: "Hasselhoff", email: "theHoff@yahoo.com", password: "password")
    admin = User.create(first_name: "John", last_name: "Smith", email: "jsmith@example.com", password: "admin123", admin: true)
    location_1 = Location.create(name: "Some place", description: "Very nice place", address: "Some str.", city: "Boston", state: "MA", zip: "02116", user_id: user_1.id)


    visit root_path
    first(:link, "Sign In").click

    fill_in 'Email', with: admin.email
    fill_in 'Password', with: admin.password
    click_button "Log in"

    first(:link, "All Users List").click

    first(:link, "Edit User").click

    fill_in 'First name', with: "Samuel"
    fill_in 'Last name', with: "Brown"
    click_button "Update User"

    expect(page).to have_content "Samuel"
    expect(page).to have_content "Brown"
  end
end
