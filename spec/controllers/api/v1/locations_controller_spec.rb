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
        description: "Good Eats, good dates, good times to be had all around; This place has it all! I give two thumbs waaaaaay up.",
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
        expect(returned_json[0]['description']).to eq "Good Eats, good dates, good times to be had all around; This place has it all! I give two thumbs waaaaaay up."
        expect(returned_json[0]['address']).to eq "15 Hancock Street"
        expect(returned_json[0]['city']).to eq "Lexington"
        expect(returned_json[0]['state']).to eq "MN"
        expect(returned_json[0]['zip']).to eq "03235"
      end
    end

    describe 'GET#show' do
      it ('should return specified location') do
        get :show, params: { id: location_1.id }

        returned_json = JSON.parse(response.body)

        expect(response.status).to eq 200
        expect(response.content_type).to eq("application/json")

        expect(returned_json['name']).to eq "Antonios"
        expect(returned_json['description']).to eq "Good Eats, good dates, good times to be had all around; This place has it all! I give two thumbs waaaaaay up."
        expect(returned_json['address']).to eq "15 Hancock Street"
        expect(returned_json['city']).to eq "Lexington"
        expect(returned_json['state']).to eq "MN"
        expect(returned_json['zip']).to eq "03235"
      end
    end

    describe "POST#create" do
      it "should create a location with the correct info if the user is signed in" do
        post_json = {
          name: "Sail Loft",
          description: "Dive Bar so divey that it caters exclusively to humpback whales (this is an awesome reference to the humpback whale's famed ability to dive down relly far)",
          address: "100 Main st",
          city: "Boston",
          state: "Ma",
          zip: "02111",
          user_id: user_1.id
        }.to_json
        sign_in user_1

        expect { post(:create, body: post_json) }.to change { Location.count }.by 1

        post(:create, body: post_json)

        returned_json = JSON.parse(response.body)
        expect(response.status).to eq 200

        expect(returned_json).to be_kind_of(Hash)
        expect(returned_json).to_not be_kind_of(Array)
        expect(returned_json['name']).to eq "Sail Loft"
        expect(returned_json['description']).to eq "Dive Bar so divey that it caters exclusively to humpback whales (this is an awesome reference to the humpback whale's famed ability to dive down relly far)"
        expect(returned_json['address']).to eq "100 Main st"
        expect(returned_json['city']).to eq "Boston"
        expect(returned_json['state']).to eq "Ma"
        expect(returned_json['zip']).to eq "02111"
        expect(returned_json['user_id']).to eq user_1.id
      end

      it "should not create a location when the user is not signed in" do
        post_json = {
          name: "Sail Loft",
          description: "Dive Bar so divey that it caters exclusively to humpback whales (this is an awesome reference to the humpback whale's famed ability to dive down relly far)",
          address: "100 Main st",
          city: "Boston",
          state: "Ma",
          zip: "02111",
          user_id: user_1.id
        }.to_json

        expect { post(:create, body: post_json) }.to change { Location.count }.by 0

        post(:create, body: post_json)

        returned_json = JSON.parse(response.body)
        expect(response.status).to eq 200

        expect(returned_json).to be_kind_of(Hash)
        expect(returned_json).to_not be_kind_of(Array)
        expect(returned_json['name']).to eq nil
        expect(returned_json['description']).to eq nil
        expect(returned_json['address']).to eq nil
        expect(returned_json['city']).to eq nil
        expect(returned_json['state']).to eq nil
        expect(returned_json['zip']).to eq nil
        expect(returned_json['user_id']).to eq nil
      end
    end
end
