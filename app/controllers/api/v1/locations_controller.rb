class Api::V1::LocationsController < ApplicationController
  skip_before_action :verify_authenticity_token

  def create
    data = JSON.parse(request.body.read)
    # new_location = Location.create(data).merge(user_id: current_user.id)
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
end
