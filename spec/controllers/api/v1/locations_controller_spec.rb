require 'rails_helper'

RSpec.describe Api::V1::LocationsController, type: :controller do

  let!(:user_1) {User.create(

        first_name: "Tiger",
        last_name: "Woods",
        email: "longdriver1@gmail.com",
        password: "nikenomore"
    )}

  let!(:location_1) {Location.create(
        name: "Antonios",
        description: "Good Eats",
        address: "15 Hancock Street",
        city: "Lexington",
        state: "MN",
        zip: "03235",
        user_id: user_1.id
    )}


    describe 'GET#index' do

      it ('should return all the locations') do

        get :index

        returned_json = JSON.parse(response.body)

        expect(response.status).to eq 200
        expect(response.content_type).to eq("application/json")

        expect(returned_json.length).to eq 1
        expect(returned_json[0]['name']).to eq "Antonios"
        expect(returned_json[0]['description']).to eq "Good Eats"
        expect(returned_json[0]['address']).to eq "15 Hancock Street"
        expect(returned_json[0]['city']).to eq "Lexington"
        expect(returned_json[0]['state']).to eq "MN"
        expect(returned_json[0]['zip']).to eq "03235"

      end

    end

end
