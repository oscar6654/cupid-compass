require 'rails_helper'

RSpec.describe Review, :type => :model do
  let!(:user) { User.create(
      first_name: "Davida",
      last_name: "Hasselhoff",
      email: "CoolSk8er123@aol.com",
      password: "1234567"
    ) }

    let!(:location) { Location.create(
        name: "Anything",
        description: "Anything",
        address: "13 Union Boulevard",
        city: "San Francisco",
        state: "CA",
        zip: "93658",
        url: "www.coolspot.com",
        user_id: user.id
      ) }

  subject {
    described_class.new(
        body: "Anything",
        rating: 5,
        vote_count: 0,
        location_id: location.id,
        user_id: user.id
      )
  }

  it "is valid with valid attributes" do
    expect(subject).to be_valid
  end

  it "is not valid without a body" do
    subject.body = nil
    expect(subject).to_not be_valid
  end

  it "is not valid without a rating" do
    subject.rating = nil
    expect(subject).to_not be_valid
  end

  it "is not valid without an vote_count" do
    subject.vote_count = nil
    expect(subject).to_not be_valid
  end
end
