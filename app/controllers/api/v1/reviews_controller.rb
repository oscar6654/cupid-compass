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
      render json: new_review
    else
      error = { message: 'You must be logged in to create a review' }
      render json: error
    end
  end

  def index
    reviews = Review.where(location_id: params[:location_id]).order(created_at: :desc)
    render json: reviews
  end

  def show
    review = Review.find(params[:id])
    render json: review
  end
end
