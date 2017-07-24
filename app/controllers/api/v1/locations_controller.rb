class Api::V1::LocationsController < ApplicationController
  skip_before_action :verify_authenticity_token

  def create
    data = JSON.parse(request.body.read)
    new_location = Location.create(
      name: data["name"],
      description: data["description"],
      address: data["address"],
      city: data["city"],
      state: data["state"],
      zip: data["zip"],
      url: data["url"],
      user_id: current_user.id)
    render json: new_location
  end

  def index
    render json: Location.all.order(created_at: :desc)
  end

  def show
    selected_location_id = params[:id].to_i
    render json: Location.find(selected_location_id)
  end
end
