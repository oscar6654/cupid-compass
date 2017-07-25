require 'rails_helper'

RSpec.describe Api::V1::ReviewsController, type: :controller do

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

  let!(:review_1) {Review.create(
        body: "Wonderful place, love it!",
        rating: 5,
        vote_count: 0,
        location_id: location_1.id,
        user_id: user_1.id
    )}

    describe 'GET#index' do
      it ('should return all reviews for current location') do
        get :index, params: {:location_id => location_1.id}

        returned_json = JSON.parse(response.body)

        expect(response.status).to eq 200
        expect(response.content_type).to eq("application/json")
        expect(returned_json[0]['body']).to eq review_1.body
        expect(returned_json[0]['rating']).to eq review_1.rating
        expect(returned_json[0]['vote_count']).to eq review_1.vote_count
        expect(returned_json[0]['location_id']).to eq review_1.location_id
        expect(returned_json[0]['user_id']).to eq review_1.user_id
      end
    end


    describe "POST#create" do
      it "should create a review with the correct info if the user is signed in" do
        post_json = {
          body: "Wonderful place, love it!",
          rating: 5,
          vote_count: 0,
          location_id: location_1.id,
          user_id: user_1.id
        }.to_json
        sign_in user_1

        expect { post(:create, params: {:location_id => location_1.id}, body: post_json) }.to change { Review.count }.by 1

        post(:create, params: {:location_id => location_1.id}, body: post_json)

        returned_json = JSON.parse(response.body)
        expect(response.status).to eq 200

        expect(returned_json).to be_kind_of(Hash)
        expect(returned_json).to_not be_kind_of(Array)
        expect(returned_json['body']).to eq review_1.body
        expect(returned_json['rating']).to eq review_1.rating
        expect(returned_json['vote_count']).to eq review_1.vote_count
        expect(returned_json['location_id']).to eq review_1.location_id
        expect(returned_json['user_id']).to eq review_1.user_id
      end

      it "should not create a review when the user is not signed in" do
        post_json = {
          body: "Wonderful place, love it!",
          rating: 5,
          vote_count: 0,
          location_id: location_1.id,
          user_id: user_1.id
        }.to_json

        expect { post(:create, params: {:location_id => location_1.id}, body: post_json) }.to change { Review.count }.by 0

        post(:create, params: {:location_id => location_1.id}, body: post_json)

        returned_json = JSON.parse(response.body)
        expect(response.status).to eq 200

        expect(returned_json).to be_kind_of(Hash)
        expect(returned_json).to_not be_kind_of(Array)
        expect(returned_json['body']).to eq nil
        expect(returned_json['rating']).to eq nil
        expect(returned_json['vote_count']).to eq nil
        expect(returned_json['location_id']).to eq nil
        expect(returned_json['user_id']).to eq nil
      end
    end
end
