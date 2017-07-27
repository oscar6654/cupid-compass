class Review < ActiveRecord::Base
  validates :body, presence: true, length: { minimum: 2 }
  validates :rating, presence: true, numericality: { only_integer: true }, inclusion: { in: [1, 2, 3, 4, 5], :message => "must be between 1 - 5" }
  validates :vote_count, presence: true, numericality: { only_integer: true }

  belongs_to :user
  belongs_to :location
  has_many :votes

end
