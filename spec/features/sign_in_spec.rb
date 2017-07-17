require "rails_helper"

feature "user signs in" do
# As as am user
#  I want to sign in
#  So that i can track my breakable toy progress

# Acceptance Criteria:
#  [] If I specify a valid, previously registered email and password,
#      I am authenticated and I gain access to the system
#  [] If i specify an invalid email and password, I remain authenticated
#  [] If i am already signed in, I can't sign in again


  scenario "visitor fills out the log-in form" do

    let!()

    visit new_restaurant_path
    expect(page).to have_content "New Restaurant Form"

    fill_in 'Name', with: "Figaro's"
    fill_in 'Address', with: "105 Beach St"
    fill_in 'City', with: "Boston"
    fill_in 'State', with: "Massachusetts"
    fill_in 'Zip', with: "02111"
    fill_in 'Description', with: "This old-school-style Italian deli serves breakfast fare & a range of sandwiches, roll-ups & salads."

    click_button "Add Restaurant"

    expect(page).to have_content "Restaurant added successfully"
    expect(page).to have_content "Figaro's"
    expect(page).to have_content "This old-school-style Italian deli serves breakfast fare & a range of sandwiches, roll-ups & salads."
  end

  scenario "visitor does not provide proper information for a restaurant" do
    visit new_restaurant_path

    click_button "Add Restaurant"
    expect(page).to have_content "Name can't be blank"
    expect(page).to have_content "Address can't be blank"
    expect(page).to have_content "City can't be blank"
    expect(page).to have_content "State can't be blank"
    expect(page).to have_content "Zip can't be blank"
    expect(page).to have_content "Zip is not a number"
  end
end
