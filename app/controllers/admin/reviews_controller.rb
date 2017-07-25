class Admin::ReviewsController < ApplicationController
  before_action :authorize_user

  def edit
    @review = Review.find(params[:id])
  end

  def update
    @review = Review.find(params[:id])
    if @review.update_attributes(edit_review_params)
      redirect_to admin_location_path(@review.location), notice: "Location Info Updated"
    else
      redirect_to admin_location_path(@review.location), notice: "Failed to Update Location!"
    end
  end

  def destroy
    @review = Review.find(params[:id]).destroy
    redirect_to admin_location_path(@review.location), notice: "Review Deleted"
  end

  private

  def authorize_user
    if !current_user.admin?
      raise ActionController::RoutingError.new("Not Found")
    end
  end

  def edit_review_params
    params.require(:review).permit(:body, :rating)
  end

end
