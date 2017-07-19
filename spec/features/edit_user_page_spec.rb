require "rails_helper"

feature "user edits info",
%Q{As a user
 I want to be able to edit my account's information
 So that i can change my info} do

# Acceptance Criteria:
#  [x] If I am logged in, I can visin edit account page
#  [x] If I specify valid current password, I can make changes to my info
#  [] If I don't specify valid current password, I can't make any changes to my info


  scenario "Visitor logs in and visit the edit page" do
    user_1 = User.create(first_name: "David", last_name: "Hasselhoff", email: "theHoff@yahoo.com", password: "password")

    visit root_path

    first(:link, "Sign In").click

    fill_in 'Email', with: user_1.email
    fill_in 'Password', with: user_1.password

    click_button "Log in"

    visit edit_user_registration_path

    expect(page).to have_content "Edit My Info"
    expect(find_field('First name').value).to eq user_1.first_name
    expect(find_field('Last name').value).to eq user_1.last_name
    expect(find_field('Email').value).to eq user_1.email
  end

  scenario "Visitor edits the information" do
    user_1 = User.create(first_name: "David", last_name: "Hasselhoff", email: "theHoff@yahoo.com", password: "password")

    visit root_path

    first(:link, "Sign In").click

    fill_in 'Email', with: user_1.email
    fill_in 'Password', with: user_1.password

    click_button "Log in"

    visit edit_user_registration_path

    fill_in "First name", with: "Howard"
    fill_in "Last name", with: "Stark"
    fill_in "Email", with: "ash@s-mart.com"
    fill_in "New Password", with: "boomstick!3vilisd3ad"
    fill_in "Confirm New Password", with: "boomstick!3vilisd3ad"
    fill_in "Current Password *", with: "password"
    attach_file "upload", "#{Rails.root}/spec/support/images/flower.jpg"

    click_button "Update"

    visit edit_user_registration_path

    expect(find_field('First name').value).to eq "Howard"
    expect(page).to have_css("img[src*='flower.jpg']")

    fill_in "Current Password *", with: "boomstick!3vilisd3ad"
    attach_file "upload", "#{Rails.root}/spec/support/images/flower2.jpg"

    click_button "Update"

    visit edit_user_registration_path

    expect(page).to have_css("img[src*='flower2.jpg']")
  end

  scenario "Visitor can't edit the information without a current password" do
    user_1 = User.create(first_name: "David", last_name: "Hasselhoff", email: "theHoff@yahoo.com", password: "password")

    visit root_path

    first(:link, "Sign In").click

    fill_in 'Email', with: user_1.email
    fill_in 'Password', with: user_1.password

    click_button "Log in"

    visit edit_user_registration_path

    fill_in "First name", with: "Howard"
    fill_in "Last name", with: "Stark"
    fill_in "Email", with: "ash@s-mart.com"
    fill_in "New Password", with: "boomstick!3vilisd3ad"
    fill_in "Confirm New Password", with: "boomstick!3vilisd3ad"
    fill_in "Current Password *", with: "p"

    click_button "Update"

    expect(page).to have_content "Current password is invalid"
  end
end
