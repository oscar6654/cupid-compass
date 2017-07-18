require "rails_helper"

feature "user signs in",
%Q{As a user
 I want to sign in
 So that i can check date spots} do

# Acceptance Criteria:
#  [X] If I specify a valid, previously registered email and password,
#      I am authenticated and I gain access to the system
#  [X] If i specify an invalid email and password, I remain unauthenticated
#  [X] If i am already signed in, I can't sign in again


  scenario "visitor fills out the log-in form" do
    user_1 = User.create(first_name: "David", last_name: "Hasselhoff", email: "theHoff@yahoo.com", password: "password")

    visit root_path

    first(:link, "Sign In").click

    expect(page).to have_content "Log in"

    fill_in 'Email', with: user_1.email
    fill_in 'Password', with: user_1.password

    click_button "Log in"

    expect(page).to have_content "Signed in successfully"
    expect(page).to have_content "Sign out"
    expect(page).not_to have_content "Sign Up"
    expect(page).not_to have_content "Sign In"
  end

  scenario "visitor fills out the log-in form incorrectly" do
    user_1 = User.create(first_name: "David", last_name: "Hasselhoff", email: "theHoff@yahoo.com", password: "password")

    visit root_path

    first(:link, "Sign In").click

    expect(page).to have_content "Log in"

    fill_in 'Email', with: "wrong@email"
    fill_in 'Password', with: "wrong_password"

    click_button "Log in"

    expect(page).to have_content "Invalid Email or password"
    expect(page).to have_content "Sign In"
    expect(page).to have_content "Sign Up"
  end

  scenario "visitor is signed in and visits sign_in page" do
    user_1 = User.create(first_name: "David", last_name: "Hasselhoff", email: "theHoff@yahoo.com", password: "password")

    visit root_path

    first(:link, "Sign In").click

    expect(page).to have_content "Log in"

    fill_in 'Email', with: user_1.email
    fill_in 'Password', with: user_1.password

    click_button "Log in"

    visit new_user_session_path

    expect(page).to have_content "You are already signed in."
  end
end
