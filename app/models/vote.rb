class Vote < ApplicationRecord
  belongs_to :user
  belongs_to :review

  after_touch do |vote|
    review = Review.find(vote.review_id)
    review.vote_count += vote.vote
    review.save!
  end
end
