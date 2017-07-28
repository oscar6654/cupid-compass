class Api::V1::LocationsController < ApplicationController
  skip_before_action :verify_authenticity_token

  def create
    data = JSON.parse(request.body.read)
    if current_user
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
    else
      error = { message: 'You must be logged in to create a new location' }
      render json: error
    end
  end

  def index
    render json: Location.all.order(average_review: :desc)
  end

  def show
    location = Location.find(params[:id])
    location.touch
    render json: location
  end

  def search
    data = JSON.parse(request.body.read)['query']
    @locations = Location
      .where('name ilike ? or description ilike ? or city ilike ? or state ilike ?',
             data, data, data, data)
    render json: @locations
  end
end
