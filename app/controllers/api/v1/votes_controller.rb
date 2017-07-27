class Api::V1::VotesController < ApplicationController
  skip_before_action :verify_authenticity_token

  def create
    data = JSON.parse(request.body.read)
    current_vote = data["user_vote"]
    vote = Vote.find_by(
      user_id: current_user.id,
      review_id: params[:review_id]
    )

    if vote
      if vote.vote === current_vote
        render json: {vote: "already voted"}
      else
        vote.vote = current_vote
        vote.save
        2.times {vote.touch}
        render json: Vote.find(vote.id), include: ["review"]
      end
    else
      vote = Vote.create(
        user_id: current_user.id,
        review_id: params[:review_id],
        vote: current_vote
      )
      vote.touch
      render json: Vote.find(vote.id), include: ["review"]
    end
  end
end
