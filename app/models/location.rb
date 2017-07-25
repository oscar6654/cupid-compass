class Location < ActiveRecord::Base
  validates :name, presence: true, length: { minimum: 2 }
  validates :description, presence: true, length: { minimum: 2 }
  validates :address, presence: true, length: { minimum: 2 }
  validates :city, presence: true, length: { minimum: 2 }
  validates :state, presence: true, length: { minimum: 2 }
  validates :zip, presence: true, numericality: { only_integer: true }, length: { is: 5 }
  validates :state, presence: true, length: { minimum: 2 }
  validates :url, format: { with: /A(http|https):\/\/[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?z/ix,
            message: "Must be a valid URL"}

  belongs_to :user
end
