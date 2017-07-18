require 'rails_helper'

RSpec.describe User, :type => :model do
  subject {
    described_class.new(
        first_name: "David",
        last_name: "Hasselhoff",
        email: "something@something.com",
        password: "12345678"
      )
  }

  it "is valid with valid attributes" do
    expect(subject).to be_valid
  end

  it "is not valid without a first_name" do
    subject.first_name = nil
    expect(subject).to_not be_valid
  end

  it "is not valid without a last_name" do
    subject.last_name = nil
    expect(subject).to_not be_valid
  end

  # it "is not valid without an email" do
  #   subject.email = nil
  #   expect(subject).to_not be_valid
  # end
  #
  # it "is not valid without a password" do
  #   subject.password = nil
  #   expect(subject).to_not be_valid
  # end
end
