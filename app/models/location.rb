class Location < ActiveRecord::Base
  validates :name, presence: true, length: { minimum: 2 }
  validates :description, presence: true, length: { minimum: 2 }
  validates :address, presence: true, length: { minimum: 2 }
  validates :city, presence: true, length: { minimum: 2 }
  validates :state, presence: true, length: { minimum: 2 }
  validates :zip, presence: true, numericality: { only_integer: true }, length: { is: 5 }
  validates :state, presence: true, length: { minimum: 2 }


  belongs_to :user
end
