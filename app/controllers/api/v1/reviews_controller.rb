class Api::V1::ReviewsController < ApplicationController
  skip_before_action :verify_authenticity_token

  def create
    data = JSON.parse(request.body.read)
    if current_user
      new_review = Review.create(
        body: data["body"],
        rating: data["rating"],
        location_id: params[:location_id],
        user_id: current_user.id,
        vote_count: 0
        )
        new_review.location.touch
      @location = Location.find(params[:location_id])
      @creator = Location.find(params[:location_id]).user

      ReviewMailer.new_review(data, current_user, @location, @creator).deliver
      render json: new_review, include: ["user"]
    else
      error = { message: 'You must be logged in to create a review' }
      render json: error
    end
  end

  def index
    reviews = Review.where(location_id: params[:location_id]).order(rating: :desc, created_at: :desc)
    render json: reviews, include: ["user"]
  end
  #
  def show
    review = Review.find(params[:id])
    render json: review
  end
  # #
  # # def update
  # #   data = JSON.parse(request.body.read)
  # #   new_vote_count = data["new_vote"]
  # #   review = Review.find(params[:id])
  # #   review.vote_count = new_vote_count
  # #   review.save
  # #   render json: review, include: ["user"]
  # # end
end
