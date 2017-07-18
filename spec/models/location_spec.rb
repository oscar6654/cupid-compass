require 'rails_helper'

RSpec.describe Location, :type => :model do
  let!(:user) { User.create(
      first_name: "Davida",
      last_name: "Hasselhoffb",
      email: "CoolSk8er123@aol.com",
      password: "1234567"
    ) }

  subject {
    described_class.new(
        name: "Anything",
        description: "Anything",
        address: "13 Union Boulevard",
        city: "San Francisco",
        state: "CA",
        zip: "93658",
        url: "www.coolspot.com",
        user_id: user.id
      )
  }

  it "is valid with valid attributes" do
    expect(subject).to be_valid
  end

  it "is not valid without a name" do
    subject.name = nil
    expect(subject).to_not be_valid
  end

  it "is not valid without a description" do
    subject.description = nil
    expect(subject).to_not be_valid
  end

  it "is not valid without an address" do
    subject.address = nil
    expect(subject).to_not be_valid
  end

  it "is not valid without an city" do
    subject.city = nil
    expect(subject).to_not be_valid
  end

  it "is not valid without an state" do
    subject.state = nil
    expect(subject).to_not be_valid
  end

  it "is not valid without an zip code" do
    subject.zip = nil
    expect(subject).to_not be_valid
  end

  it "IS valid without an url" do
    subject.url = nil
    expect(subject).to be_valid
  end
end
